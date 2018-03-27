package main

type Server struct {
	clients      map[*Client]bool
	registers    chan *Client
	unregisters  chan *Client
	broadcast    chan []byte
	pastMessages [][]byte
}

func NewServer() *Server {
	return &Server{
		clients:      make(map[*Client]bool),
		registers:    make(chan *Client),
		unregisters:  make(chan *Client),
		broadcast:    make(chan []byte),
		pastMessages: make([][]byte, 0),
	}
}

func (server *Server) Listen() {
	for {
		select {
		case client := <-server.registers:
			server.clients[client] = true
			for _, msg := range server.pastMessages {
				client.send <- msg
			}
		case client := <-server.unregisters:
			delete(server.clients, client)
		case msg := <-server.broadcast:
			server.pastMessages = append(server.pastMessages, msg)
			for client, _ := range server.clients {
				select {
				case client.send <- msg:
				default:
					close(client.send)
					delete(server.clients, client)
				}
			}
		}
	}
}
