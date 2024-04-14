# Step 1: Set up the base image
FROM node:14 AS build-stage

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the Vue.js application
RUN npm run build

# Step 7: Set up the runtime image
FROM node:14 AS production-stage

# Step 8: Set the working directory in the container
WORKDIR /app

# Step 9: Copy the built files from the build-stage into the production-stage
COPY --from=build-stage /app/dist /app/dist

# Step 10: Expose port 8080
EXPOSE 8080

# Step 11: Command to serve the built files using a simple HTTP server
CMD ["npx", "http-server", "dist"]