FROM node:14-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build:tha
EXPOSE 8080
WORKDIR ./dist/apps/top-hotels-aggregator
CMD ["node", "main"]