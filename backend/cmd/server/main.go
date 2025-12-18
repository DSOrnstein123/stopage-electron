package main

import (
	"database/sql"
	"log"
	"main/internal/api"
	databasegen "main/internal/generated/database"
	"main/internal/generated/openapi"
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
	dbPath := filepath.Join(dir, "..", "..", "..", "data", "dev.db")

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

	apiServer := api.NewApiServer(queries)
	openapi.RegisterHandlersWithOptions(router, apiServer, openapi.GinServerOptions{
		ErrorHandler: api.ErrorHandler,
	})

	router.Run(":5000")
}
