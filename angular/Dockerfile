# base image
FROM mhart/alpine-node:12.16.2 as app

# copy npm files and install first before app for caching
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install

# copy rest of app over
COPY . .

# build static angular files
RUN npm run ng build --prod

# nginx setup
FROM nginx:alpine
COPY ./.nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=app /app/dist /usr/share/nginx/html
EXPOSE 4200 80

# start nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
