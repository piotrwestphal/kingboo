FROM node:12-slim as BASE
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:srm
EXPOSE 8080
WORKDIR ./dist/apps/search-request-manager
CMD ["node", "main"]
