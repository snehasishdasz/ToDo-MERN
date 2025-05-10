FROM node:18-alpine

# set working directory
WORKDIR /app

#copy .json file8
COPY package*.json ./
RUN npm install

# copy all files
COPY . .

EXPOSE 8000

# start server of backen application
CMD ["nodemon", "app.js"]