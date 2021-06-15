FROM node:14.16.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm ci --only=production
COPY . .
EXPOSE 9000
CMD [ "npm", "start" ]
