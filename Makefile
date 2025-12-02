APP_NAME=stopage

dbgen:
	cd backend/database && sqlc generate

begen:
	oapi-codegen --config=./api/config.yaml ./api/openapi.yaml