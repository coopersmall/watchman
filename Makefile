NAME=$(shell node -p "require('./package.json').name")
VERSION=$(shell node -p "require('./package.json').version")
HEADER=[$(NAME): v$(VERSION)]

PACKAGE_MANAGER=pnpm

build:
	@echo "$(HEADER) Building all packages" && \
	$(PACKAGE_MANAGER) build

clean:
	@echo "$(HEADER) Cleaning all packages" && \
	$(PACKAGE_MANAGER) clean

commit-all:
	@echo "${HEADER} Adding and commiting all changed files" && \
	$(PACKAGE_MANAGER) commit-all

deps:
	@echo "$(HEADER) Installing all dependencies" && \
	. ./scripts/setup.sh && \
	$(PACKAGE_MANAGER) setup

format:
	@echo "$(HEADER) Checking formatting for all packages" && \
	$(PACKAGE_MANAGER) format

format-fix:
	@echo "$(HEADER) Fixing formatting for all packages" && \
	$(PACKAGE_MANAGER) format-fix

lint:
	@echo "$(HEADER) Linting all packages" && \
	$(PACKAGE_MANAGER) lint

lint-fix:
	@echo "$(HEADER) Fixing lint for all packages" && \
	$(PACKAGE_MANAGER) lint-fix

start:
	@echo "$(HEADER) Starting all packages" && \
	$(PACKAGE_MANAGER) dev

test:
	@echo "$(HEADER) Testing all packages" && \
	$(PACKAGE_MANAGER) test