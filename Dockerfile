# Stage 1: Build React client
FROM node:20-alpine AS client
WORKDIR /app/client
COPY ./client/package*.json .
RUN npm install
COPY client .
RUN npm run build

# Stage 2: Build Express server
FROM client
WORKDIR /app/server
COPY ./server/package*.json .
RUN npm install
COPY server .
EXPOSE 3000
CMD [ "npm", "run", "start" ]
