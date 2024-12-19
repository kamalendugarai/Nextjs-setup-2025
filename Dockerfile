FROM node:21.7.3-alpine

ENV HOSTNAME=0.0.0.0

WORKDIR /app
COPY . .

RUN node -v
RUN npm ci
RUN npm run build
CMD ["npm", "run", "dev"]
