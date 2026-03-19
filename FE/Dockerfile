FROM node:24-alpine

WORKDIR /app

# Copy package files for cache optimization
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Build the Vite project
RUN npm run build

# Install serve to run production build
RUN npm install -g serve

EXPOSE 3000

# Serve the production build using the package "serve"
CMD ["serve", "-s", "dist", "-l", "3000"]
