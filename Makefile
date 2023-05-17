BUILD_TAG ?= latest

run-dev:
	VITE_GIT_TAG=${BUILD_TAG} \
	VITE_GIT_REMOTE=$(shell git config --get remote.origin.url) \
	VITE_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	VITE_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	yarn dev

run-build:
	VITE_GIT_TAG=${BUILD_TAG} \
	VITE_GIT_REMOTE=$(shell git config --get remote.origin.url) \
	VITE_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	VITE_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	yarn build

run-build-netlify:
	VITE_GIT_TAG=${BUILD_TAG} \
	VITE_GIT_REMOTE=$(shell git config --get remote.origin.url) \
	VITE_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	VITE_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	yarn build && \
	netlify deploy --alias=${BUILD_TAG} --dir=dist

run-deploy-netlify:
	netlify deploy --prod --dir=dist
