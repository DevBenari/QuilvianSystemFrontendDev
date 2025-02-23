FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY next.config.js ./next.config.js

COPY public ./public
COPY components ./components
COPY assets ./assets
COPY lib ./lib
COPY style ./style
COPY utils ./utils

CMD ["npm", "run", "dev:prod"]