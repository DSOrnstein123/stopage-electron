package main

import (
	"database/sql"
	"log"
	"main/database/gen"
	"main/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "modernc.org/sqlite"
)

func main() {
	db, err := sql.Open("sqlite", "D:/code/stopage-electron/data/dev.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	queries := gen.New(db)

	router := gin.Default()
	router.Use(cors.Default())

	apiRoute := router.Group("/api")
	{
		routes.DecksRoute(apiRoute, queries)
		routes.DocumentsRoute(apiRoute, queries)
	}

	router.Run(":5000")
}
