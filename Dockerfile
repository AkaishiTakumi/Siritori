FROM node:16-alpine

ENV HOST 0.0.0.0

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]