FROM node:12
WORKDIR /usr/src/app
RUN git clone https://github.com/fauna/dashboard.git .
RUN npm install --unsafe-perm
EXPOSE 3000
CMD ["npm", "start"]
