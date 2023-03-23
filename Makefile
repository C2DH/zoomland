BUILD_TAG ?= latest

run-dev:
	REACT_APP_GIT_TAG=${BUILD_TAG} \
	REACT_APP_GIT_REMOTE=$(shell git config --get remote.origin.url) \
	REACT_APP_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	npm start

run-build:
	REACT_APP_GIT_TAG=${BUILD_TAG} \
	REACT_APP_GIT_REMOTE=$(shell git config --get remote.origin.url) \
	REACT_APP_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	npm run build

run-build-netlify:
	REACT_APP_GIT_TAG=${BUILD_TAG} \
	REACT_APP_GIT_REMOTE=$(shell git config --get remote.origin.url) \
	REACT_APP_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	npm run build && \
	netlify deploy --alias=${BUILD_TAG} --dir=build

run-deploy-netlify:
	netlify deploy --prod --dir=build
