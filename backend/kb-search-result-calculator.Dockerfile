FROM node:14-slim as BASE
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:src
EXPOSE 8080
WORKDIR ./dist/apps/search-result-calculator
CMD ["node", "main"]
