From node:16-alpine
RUN mkdir /jw-home-front-web
WORKDIR /jw-home-front-web
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8091
ENTRYPOINT npm start