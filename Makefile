NAME=Watchman
ECHO_NAME=[$(NAME)]

build:
	echo "$(ECHO_NAME) Building all packages" && pnpm build

clean:
	echo "$(ECHO_NAME) Cleaning all packages" && pnpm clean

commit-all:
	echo "${ECHO_NAME} Adding and commiting all changed files" && pnpm commit-all

deps:
	echo "$(ECHO_NAME) Installing all dependencies" && pnpm setup

format:
	echo "$(ECHO_NAME) Checking formatting for all packages" && pnpm format

format-fix:
	echo "$(ECHO_NAME) Fixing formatting for all packages" && pnpm format-fix

lint:
	echo "$(ECHO_NAME) Linting all packages" && pnpm lint

lint-fix:
	echo "$(ECHO_NAME) Fixing lint for all packages" && pnpm lint-fix

start:
	echo "$(ECHO_NAME) Starting all packages" && pnpm dev

test:
	echo "$(ECHO_NAME) Testing all packages" && pnpm test