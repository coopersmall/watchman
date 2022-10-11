build:
	yarn build

clean:
	yarn clean

delete-dist:
	rm -rf dist

deps:
	yarn install

format:
	yarn prettier

lint:
	yarn lint

start:
	yarn start

relint:
	yarn lint-fix
