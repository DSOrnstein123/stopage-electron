package main

import (
	"database/sql"
	"log"
	"main/database/gen"
	"main/routes"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "modernc.org/sqlite"
)

func main() {
	db, err := sql.Open("sqlite", "F:/Code/stopage-main/data/dev.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	queries := gen.New(db)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5123"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	apiRoute := router.Group("/api")
	{
		routes.DecksRoute(apiRoute, queries)
		routes.DocumentsRoute(apiRoute, queries)
	}

	router.Run(":5000")
}
