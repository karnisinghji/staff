build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	cd backend/api-gateway && npm test
	cd backend/services/matching-service && npm test

lint:
	cd backend/api-gateway && npm run lint
	cd backend/services/matching-service && npm run lint
