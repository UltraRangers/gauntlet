FROM node:8.10-alpine

# Create app directory
WORKDIR /usr/app

COPY ./package.json ./

# Adding the registry will make the installation fast (https://medium.com/@andyccs/webpack-and-docker-for-development-and-deployment-ae0e73243db4#.v0vhqvvjl)
RUN npm config set registry http://registry.npmjs.org/ && npm install --quiet

# Expose the node_modules/.bin to be use in the app
ENV PATH /usr/app/node_modules/.bin:$PATH

# Bundle app source
COPY ./ ./
