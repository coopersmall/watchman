NAME=$(shell node -p "require('./package.json').name")
VERSION=$(shell node -p "require('./package.json').version")
HEADER=[$(NAME): v$(VERSION)]

PACKAGE_MANAGER=pnpm

GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

build:
	@echo "$(HEADER) Building all packages" && \
	$(PACKAGE_MANAGER) build

clean:
	@echo "$(HEADER) Cleaning all packages" && \
	$(PACKAGE_MANAGER) clean

commit:
	@echo "${HEADER} Creating commit for ${GIT_BRANCH}" && \
	. ./scripts/version.sh && \
	git add -A -- ./.changeset && \
	$(PACKAGE_MANAGER) commit

commit-all:
	@echo "${HEADER} Creating commit for all changed files on ${GIT_BRANCH}" && \
	. ./scripts/version.sh && \
	git add . && \
	$(PACKAGE_MANAGER) commit

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

push-all:
	@echo "${HEADER} Pushing all changed files to ${GIT_BRANCH}" && \
	. ./scripts/version.sh && \
	git add . && \
	$(PACKAGE_MANAGER) commit && \
	git push origin $(GIT_BRANCH)

start:
	@echo "$(HEADER) Starting all packages" && \
	$(PACKAGE_MANAGER) dev

test:
	@echo "$(HEADER) Testing all packages" && \
	$(PACKAGE_MANAGER) test