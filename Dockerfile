FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY next.config.js ./next.config.js


COPY components ./components
COPY lib ./lib
COPY style ./style
COPY utils ./utils

CMD ["npm", "run", "dev:prod"]