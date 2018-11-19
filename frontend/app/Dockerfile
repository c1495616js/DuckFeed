FROM node:8.7.0-alpine

RUN mkdir -p /srv/app
WORKDIR /srv/app

COPY package.json /srv/app
COPY package-lock.json /srv/app

RUN npm install

COPY . /srv/app

CMD [ "npm", "start" ]