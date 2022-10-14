NAME=$(shell node -p "require('./package.json').name")
VERSION=$(shell node -p "require('./package.json').version")
ECHO_HEADER=[$(NAME): v$(VERSION)]

PACKAGE_MANAGER=pnpm

build:
	@echo "$(ECHO_HEADER) Building all packages" && \
	$(PACKAGE_MANAGER) build

clean:
	@echo "$(ECHO_HEADER) Cleaning all packages" && \
	$(PACKAGE_MANAGER) clean

commit-all:
	@echo "${ECHO_HEADER} Adding and commiting all changed files" && \
	$(PACKAGE_MANAGER) commit-all

deps:
	@echo "$(ECHO_HEADER) Installing all dependencies" && \
	$(PACKAGE_MANAGER) setup

format:
	@echo "$(ECHO_HEADER) Checking formatting for all packages" && \
	$(PACKAGE_MANAGER) format

format-fix:
	@echo "$(ECHO_HEADER) Fixing formatting for all packages" && \
	$(PACKAGE_MANAGER) format-fix

lint:
	@echo "$(ECHO_HEADER) Linting all packages" && \
	$(PACKAGE_MANAGER) lint

lint-fix:
	@echo "$(ECHO_HEADER) Fixing lint for all packages" && \
	$(PACKAGE_MANAGER) lint-fix

start:
	@echo "$(ECHO_HEADER) Starting all packages" && \
	$(PACKAGE_MANAGER) dev

test:
	@echo "$(ECHO_HEADER) Testing all packages" && \
	$(PACKAGE_MANAGER) test