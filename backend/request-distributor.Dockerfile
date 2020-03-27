FROM node:12-slim as BASE
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:rd
EXPOSE 8080
WORKDIR ./dist/apps/request-distributor
CMD ["node", "main"]
