# Use the official Nginx image from Docker Hub
FROM nginx:1.27.1-alpine3.20

# Copy the build output from your React app into the Nginx image
#COPY build/ /usr/share/nginx/html

# Optionally customize Nginx configuration
#COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Define the command to run your app using CMD which runs when the container is started
CMD ["nginx", "-g", "daemon off;"]