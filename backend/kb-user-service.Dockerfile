FROM node:14-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build:us
EXPOSE 8080
CMD ["node", "dist/apps/user-service/main"]
