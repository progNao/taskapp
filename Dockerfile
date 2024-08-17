FROM node:22-alpine

WORKDIR /app

RUN apk update && \
    npm install -g npm