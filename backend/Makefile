default: up

up:
	npm run start:dev

bootstrap:
	npm install
	docker-compose up -d
	npm run start:dev

container-build:
	docker build -t $(imageName) .

container-up:
	docker-compose up -d

container-down:
	docker-compose down
