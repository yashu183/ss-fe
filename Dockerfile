FROM node:alpine
WORKDIR .
COPY package.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]