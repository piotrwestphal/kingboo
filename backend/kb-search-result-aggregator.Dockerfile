FROM node:14-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build:sra
EXPOSE 8080
CMD ["node", "dist/apps/search-result-aggregator/main"]
