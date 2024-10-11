package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

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

type DATA struct {
	Type string `json:"type"`
	Data string `json:"data"`
}

// feedback response structure
type FeedbackData struct {
	Status   int    `json:"status"`
	UserHash string `json:"user_hash"`
	Data     DATA   `json:"data"`
}

// feed data
// type Feed struct {
// 	Status int `json:"status"`
// 	// Message string `json:"Message"`
// 	Data string `json:"data"`
// }

type InterpreterRequest struct {
	UserHash string `json:"user_hash"`
	Data     string `json:"data"`
}

// general response structure
type Res struct {
	Status int    `json:"status"`
	Type   string `json:"type"`
	Data   string `json:"data"`
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins for simplicity; adjust as needed
	},
}

// save connections in a map
var ConnectedUsers map[string]Client

func getEnv(key, defaultValue string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		return defaultValue
	}
	return value
}

func main() {

	// initialize
	ConnectedUsers = make(map[string]Client)
	e := echo.New()

	// middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// serve static application page
	e.Static("/", "dist")

	e.GET("/test", func(c echo.Context) error {
		return c.String(200, "Hello World")
	})

	// ws route
	e.GET("/run", handleWebSocket)

	// handle feedbacks
	e.POST("/feedback", feedback)

	// start server
	e.Logger.Fatal(e.Start(":8080"))
}

// complete feedback function
func feedback(c echo.Context) error {

	received_feedback := new(FeedbackData)
	if err := c.Bind(received_feedback); err != nil {
		fmt.Println("failed to read feedback: ", err.Error())
		return err
	}

	fmt.Println("feedback for user: ", received_feedback.UserHash)

	// get connection
	client, ok := ConnectedUsers[received_feedback.UserHash]
	if !ok {
		fmt.Println("feedback received but no connection is found. user: ", received_feedback.UserHash)
		res := &Res{
			Status: 503,
			Type:   "status",
			Data:   "feedback received but no connection is found!",
		}
		return c.JSON(http.StatusOK, res)
	}

	// feed user with received data
	user_feed := &Res{
		Status: 200,
		Type:   received_feedback.Data.Type,
		Data:   received_feedback.Data.Data,
	}

	if err := client.Connection.WriteJSON(user_feed); err != nil {
		fmt.Println("failed to inform user: ", received_feedback.UserHash)
		res := &Res{
			Status: 503,
			Type:   "status",
			Data:   "failed to inform user.",
		}
		return c.JSON(http.StatusOK, res)
	}

	res := &Res{
		Status: http.StatusOK,
		Type:   "status",
		Data:   "feedback received!",
	}
	return c.JSON(http.StatusOK, res)
}

// upload raw data to interpreter!
func callInterpreter(conn *websocket.Conn, userData string, userHash string) {
	fmt.Println("calling interpreter...")
	// prepare data
	reqData := &InterpreterRequest{
		UserHash: userHash,
		Data:     userData,
	}
	jsonData, err := json.Marshal(reqData)
	if err != nil {
		fmt.Println("failed to marshal json data")
		return
	}

	// create req for interpreter
	interpreter_api := getEnv("INTERPRETER_SERVICE", "http://localhost:4000/interpret")
	fmt.Println(interpreter_api)
	req, err := http.NewRequest(http.MethodPost, interpreter_api, bytes.NewBuffer(jsonData))
	if err != nil {
		res := &Res{
			Status: 503,
			Type:   "status",
			Data:   "cannot create request for client!",
		}
		if err := conn.WriteJSON(res); err != nil {
			fmt.Println("failed to inform user: ", userHash)
			return
		}
		return
	}
	req.Header.Set("Content-Type", "application/json")

	// call interpreter
	client := &http.Client{}
	client_res, err := client.Do(req)
	if err != nil {
		res := &Res{
			Status: 503,
			Type:   "status",
			Data:   "failed to reach interpreter!",
		}
		if err := conn.WriteJSON(res); err != nil {
			fmt.Println("failed to inform user: ", userHash)
		}
		return
	}
	defer client_res.Body.Close()

	res := &Res{
		Status: 200,
		Type:   "status",
		Data:   "interpreter is processing data",
	}
	if err := conn.WriteJSON(res); err != nil {
		fmt.Println("failed to inform user: ", userHash)
		return
	}
	fmt.Println("interpreter called")
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
			Status: http.StatusOK,
			Type:   "status",
			Data:   "processing data...",
		}

		if err := conn.WriteJSON(res); err != nil {
			break
		}
	}
	fmt.Println("closing connection. user hash:", userHash)
	return nil
}
