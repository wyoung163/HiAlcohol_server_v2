FROM node:14.16.0
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN yarn
RUN npm install --save-dev @babel/core @babel/node
COPY ./ ./
CMD ["yarn", "start"]
