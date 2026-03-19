FROM node:24-alpine

WORKDIR /app

# Copy package files for cache optimization
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

EXPOSE 5000

# Start the application
CMD ["npm", "start"]
