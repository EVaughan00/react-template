FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

ARG ENV_FILE
RUN echo "$ENV_FILE" > .env

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/dist/icons /usr/share/nginx/html/icons
COPY --from=build /app/dist/favicon.ico /usr/share/nginx/html/favicon.ico
COPY --from=build /app/dist/index.html /usr/share/nginx/html/index.html


COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
