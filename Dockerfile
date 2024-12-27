FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9660

CMD ["node", "app.js", "--port", "9660"] 