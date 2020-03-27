FROM node:12-slim as BASE
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:sm
EXPOSE 8080
WORKDIR ./dist/apps/search-manager
CMD ["node", "main"]
