# Step 1: Build React app
FROM node:16-slim AS builder

# 빌드 인수 선언
ARG REACT_APP_BUCKET_URL
ENV REACT_APP_BUCKET_URL=${REACT_APP_BUCKET_URL}

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Nginx to serve the build
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build 결과물 복사
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx를 3000번 포트에서 실행
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
