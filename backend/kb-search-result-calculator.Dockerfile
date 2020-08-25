FROM node:14-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build:src
EXPOSE 8080
WORKDIR ./dist/apps/search-result-calculator
CMD ["node", "main"]
