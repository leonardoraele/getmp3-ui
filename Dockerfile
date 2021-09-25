FROM node:current-alpine AS build

WORKDIR /app

COPY . .

ENV API_PATH=/

RUN npm ci && npm run build:production

FROM scratch

COPY --from=build /app/dist /dist
