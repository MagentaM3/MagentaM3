# Base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm i

# Copy application code
COPY . .

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "dev"]