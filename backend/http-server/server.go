package main

import (
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins for simplicity; adjust as needed
	},
}

func main() {
	e := echo.New()

	// middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// application page
	e.Static("/", "build")

	// ws route
	e.GET("/run", handleWebSocket)

	// start server
	e.Logger.Fatal(e.Start(":8080"))

}

func handleWebSocket(c echo.Context) error {
	conn, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer conn.Close()

	for {
		// Read message from client
		messageType, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}

		// Log the message (or process it as needed)
		println(string(msg))

		// Echo the message back to the client
		if err := conn.WriteMessage(messageType, msg); err != nil {
			break
		}
	}
	return nil
}
