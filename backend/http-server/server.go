package main

import (
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// client data structure
type Client struct {
	Connection *websocket.Conn
	UserHash   string
}

// feedback response structure
type FeedbackData struct {
	Status   int    `json:"status"`
	UserHash string `json:"user_hash"`
	Data     string `json:"data"`
}

type InterpreterRequest struct {
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

// save connections in a map
var ConnectedUsers map[string]Client

func main() {

	// initialize
	ConnectedUsers = make(map[string]Client)
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

// TODO: upload raw data to interpreter!
func callInterpreter(conn *websocket.Conn, userData string, userHash string) {
	reqData := &InterpreterRequest{
		UserHash: userHash,
		Data:     userData,
	}
	fmt.Println(reqData.UserHash)
	fmt.Println("calling interpreter...")

	// TODO: call interpreter and return result

	res := &Res{
		Status:  http.StatusOK,
		Message: "interpreter received diagram data...",
	}

	if err := conn.WriteJSON(res); err != nil {
		fmt.Println("failed to inform user: ", userHash)
	}
}

// handles websocket connection
func handleWebSocket(c echo.Context) error {
	conn, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer conn.Close()

	// generate user hash
	userHash := uuid.New().String()
	fmt.Println(userHash)

	// save connection data
	clientData := Client{
		Connection: conn,
		UserHash:   userHash,
	}
	ConnectedUsers[userHash] = clientData
	defer delete(ConnectedUsers, userHash)

	fmt.Println("user connected with hash: ", userHash)

	for {
		// Read message from client
		_, data, err := conn.ReadMessage()
		if err != nil {
			break
		}

		// process data and sent a note to interpreter
		go callInterpreter(conn, string(data), userHash)

		res := &Res{
			Status:  http.StatusOK,
			Message: "we are processing your data...",
		}

		if err := conn.WriteJSON(res); err != nil {
			break
		}
	}
	fmt.Println("closing connection. user hash:", userHash)
	return nil
}
