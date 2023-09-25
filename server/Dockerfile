FROM node:latest
WORKDIR /allthememes/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]