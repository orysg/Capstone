# Use the official Node.js image
FROM node:20.17.0-alpine3.20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json .

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port that the server will run on
EXPOSE 3000

# Set environment variables (can also be in .env file)
# ENV NODE_ENV=production

# Start the server
CMD ["yarn", "start"]
