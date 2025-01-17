
FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY src/ .
EXPOSE 3000
CMD [ "npm", "dev"]