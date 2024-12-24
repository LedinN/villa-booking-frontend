# Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the frontend for production
RUN npm run build

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
