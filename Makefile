.PHONY: build-staging
build-staging:
	docker compose -f docker/staging/docker-compose.yml build

.PHONY: start-staging
start-staging:
	docker compose -f docker/staging/docker-compose.yml up
