APP_NAME=stopage

dbgen:
	cd backend/database && sqlc generate

SPECS = \
	./api/config.yaml:./api/openapi.yaml \
	./api/documents/config.yaml:./api/documents/components.yaml \
	./api/decks/config.yaml:./api/decks/components.yaml \
	./api/shared/error/config.yaml:./api/shared/error/components.yaml

begen:
	@for spec in $(SPECS); do \
		CONFIG=$${spec%%:*}; \
		FILE=$${spec##*:}; \
		oapi-codegen --config="$$CONFIG" "$$FILE"; \
	done

redoc:
	cd docs && go run main.go

