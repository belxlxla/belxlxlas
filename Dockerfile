# Step 1: Build React app
FROM node:18 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Step 2: Setup Node.js backend
FROM node:18
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install
COPY backend ./backend
COPY --from=builder /app/build ./backend/public

EXPOSE 5000
CMD ["node", "backend/server.js"]
