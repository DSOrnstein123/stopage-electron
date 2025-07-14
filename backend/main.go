package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5123")

	fmt.Fprint(w, "Hello from Go backend!")
}

func main() {
	http.HandleFunc("/api/hello", helloHandler)
	fmt.Println("Go server running on :5000")
	http.ListenAndServe(":5000", nil)
}
