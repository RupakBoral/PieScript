# Base image with Node.js
FROM node:18

# Install Python3, pip, and ffmpeg
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install Node dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Start the server
CMD ["node", "server.js"]
