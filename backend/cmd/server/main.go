package main

import (
	"database/sql"
	"log"
	"main/internal/api"
	databasegen "main/internal/generated/database"
	openapi "main/internal/generated/openapi"
	"main/routes"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "modernc.org/sqlite"
)

func main() {
	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	dbPath := filepath.Join(dir, "..", "data", "dev.db")

	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	queries := databasegen.New(db)

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

	apiServer := api.NewApiServer()
	openapi.RegisterHandlers(router, apiServer)

	router.Run(":5000")
}
