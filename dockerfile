# Use an official Node runtime as a parent image
FROM node:19.8-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Install `serve` to run the application
RUN npm install -g serve

# Serve the app on port 8080
CMD serve -s build -l 8080

# Expose port 8080
EXPOSE 8080
