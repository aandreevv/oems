FROM node:20.12-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json tsconfig.json
RUN npm install
COPY ./ ./
RUN npm run build

FROM node:20.12-alpine AS final
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder ./usr/src/app/dist ./dist
EXPOSE 3000
CMD npm run start:prod
