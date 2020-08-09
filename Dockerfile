# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --no-optional
COPY . .
EXPOSE 3000

CMD ["node", "app.js"]
