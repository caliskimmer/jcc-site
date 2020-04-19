FROM node:current-alpine

WORKDIR app/

COPY package.json package-lock.json ./
RUN npm install

COPY . .
COPY /jogachiropractic_com/jogachiropractic_com.key /etc/ssl
COPY /jogachiropractic_com/jogachiropractic_com.crt /etc/ssl 
