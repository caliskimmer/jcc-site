# base image
FROM node:current-alpine as app

WORKDIR app/

# copy npm files and install first before app for caching
COPY angular/package.json angular/package-lock.json ./
RUN npm install
 
# copy rest of app over
COPY angular/ .

# build static angular files
RUN npm run ng build -- --prod

# nginx setup
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY /nginx/default.conf /etc/nginx/conf.d/
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=app /app/dist /usr/share/nginx/html
