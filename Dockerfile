FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]







# build the image
# $ docker build -t <your username>/blog-backend-node .

# Run the image
# use --network="host" to connect to localhost (locally )
# $ docker run -d --rm -p 5000:5000 --network="host" <your username>/blog-backend-node

# Get container ID
# $ docker ps

# Print app output
# $ docker logs <container id>

# Stop Conatiner
# $ docker container stop <container id>