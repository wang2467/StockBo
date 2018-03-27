package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
)

type Message struct {
	message  string `json: message`
	username string `json: username`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func echo(w http.ResponseWriter, r *http.Request) {
	conn, _ := upgrader.Upgrade(w, r, nil)
	for {
		msgType, msg, err := conn.ReadMessage()
		if err != nil {
			return
		}
		fmt.Printf("%s sent: %s\n", conn.RemoteAddr(), msg)
		fmt.Println(msgType)
		if err = conn.WriteMessage(msgType, msg); err != nil {
			return
		}
	}
}

func echohome(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "websockets.html")
}

func chathome(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "home.html")
}

func main() {
	server := NewServer()
	go server.Listen()
	http.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
		handleChat(server, w, r)
	})
	http.HandleFunc("/echo", echo)
	http.HandleFunc("/", chathome)
	http.ListenAndServe(":8000", nil)
}
