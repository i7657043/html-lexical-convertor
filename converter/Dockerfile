# Use an official Node.js runtime as the base image
FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

ENV NODE_ENV=development

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]