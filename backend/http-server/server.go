package main

import (
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	// e.GET("/", func(c echo.Context) error {
	// 	return c.String(http.StatusOK, "Hello, World!")
	// })
	e.Static("/", "build")
	e.Logger.Fatal(e.Start(":8080"))
}
