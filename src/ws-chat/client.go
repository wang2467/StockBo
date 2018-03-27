package main

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

type Client struct {
	send   chan []byte
	conn   *websocket.Conn
	server *Server
}

func NewClient(ws *websocket.Conn, s *Server) *Client {
	return &Client{
		send:   make(chan []byte),
		conn:   ws,
		server: s,
	}
}

func handleChat(s *Server, w http.ResponseWriter, r *http.Request) {
	log.Println("Connected")
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := NewClient(conn, s)
	client.server.registers <- client
	go client.Write()
	go client.Read()
}

func (client *Client) Read() {
	defer func() {
		client.server.unregisters <- client
		client.conn.Close()
	}()
	for {
		_, msg, err := client.conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		client.server.broadcast <- msg
	}
}

func (client *Client) Write() {
	defer func() {
		client.conn.Close()
	}()
	for {
		select {
		case msg := <-client.send:
			if err := client.conn.WriteMessage(websocket.TextMessage, msg); err != nil {
				log.Println(err)
				return
			}
		}
	}

}
