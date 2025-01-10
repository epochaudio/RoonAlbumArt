FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3666

CMD ["node", "app.js", "--port", "3666"] 