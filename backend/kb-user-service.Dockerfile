FROM node:14-slim as BASE
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY docker .
RUN npm run build:us
EXPOSE 8080
WORKDIR ./dist/apps/user-service
CMD ["node", "main"]
