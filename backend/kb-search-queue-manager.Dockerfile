FROM node:12-slim as BASE
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:sqm
EXPOSE 8080
WORKDIR ./dist/apps/search-queue-manager
CMD ["node", "main"]
