FROM node:16-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache ffmpeg

COPY package.json .
COPY yarn.lock .
COPY src .

RUN yarn install

CMD ["node", "index.js"]
