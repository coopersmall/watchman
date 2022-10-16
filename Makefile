NAME = $(shell node -p "require('./package.json').name")
VERSION = $(shell node -p "require('./package.json').version")
HEADER = [$(NAME): v$(VERSION)]

PACKAGE_MANAGER = pnpm

# Utilities
MAKEFILE_PATH = $(strip $(MAKEFILE_LIST))
MAKEFILE_DIR = $(shell dirname "$(MAKEFILE_PATH)")

# Git Operations
GIT_ADD_ALL = git add .
GIT_ADD_CHANGESET = git add -A -- ./.changeset
GIT_BRANCH = $(shell git rev-parse --abbrev-ref HEAD)
GIT_PUSH_TO_BRANCH = git push origin $(GIT_BRANCH)

# Run Scripts from ./scripts
RUN_SETUP = . $(MAKEFILE_DIR)/scripts/setup.sh
RUN_VERSION = . $(MAKEFILE_DIR)/scripts/version.sh

build:
	@echo "$(HEADER) Building all packages" && \
	$(PACKAGE_MANAGER) build

clean:
	@echo "$(HEADER) Cleaning all packages" && \
	$(PACKAGE_MANAGER) clean

commit:
	@echo "${HEADER} Creating commit for ${GIT_BRANCH}" && \
	$(RUN_VERSION) && \
	$(GIT_ADD_CHANGESET) && \
	$(PACKAGE_MANAGER) commit

commit-all:
	@echo "${HEADER} Creating commit for all changed files on ${GIT_BRANCH}" && \
	$(GIT_ADD_ALL) \
	$(RUN_VERSION) && \
	$(GIT_ADD_CHANGESET) && \
	$(PACKAGE_MANAGER) commit

deps:
	@echo "$(HEADER) Installing all dependencies" && \
	$(RUN_SETUP) && \
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
	$(GIT_ADD_ALL) && \
	$(RUN_VERSION) && \
	$(GIT_ADD_CHANGESET) && \
	$(PACKAGE_MANAGER) commit && \
	$(GIT_PUSH_TO_BRANCH)

start:
	@echo "$(HEADER) Starting all packages" && \
	$(PACKAGE_MANAGER) dev

test:
	@echo "$(HEADER) Testing all packages" && \
	$(PACKAGE_MANAGER) test