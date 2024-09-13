package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// feedback response structure
type FeedbackResponse struct {
	Status   int    `json:"status"`
	UserHash string `json:"user_hash"`
	Data     string `json:"data"`
}

// general response structure
type Res struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

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

	// handle feedbacks
	e.POST("/feedback", feedback)

	// start server
	e.Logger.Fatal(e.Start(":8080"))
}

// TODO: complete feedback function
func feedback(c echo.Context) error {
	fmt.Println("some context in feedback")
	res := &Res{
		Status:  http.StatusOK,
		Message: "feedback received!",
	}
	return c.JSON(http.StatusOK, res)
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
		fmt.Println(string(msg))

		// Echo the message back to the client
		if err := conn.WriteMessage(messageType, msg); err != nil {
			break
		}
	}
	return nil
}
