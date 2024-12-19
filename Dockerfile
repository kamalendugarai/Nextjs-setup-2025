FROM node:21.7.3-alpine
# RUN apt-get update
# RUN apt install -y curl
# RUN export NVM_DIR="$HOME/.nvm"
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# # RUN . "$NVM_DIR/nvm.sh"
# RUN /bin/bash -ic "source ~/.bashrc"
# RUN echo nvm

# ENV NVM_DIR=/usr/local/nvm
# ENV NODE_VERSION=v20.12.2

# RUN mkdir -p $NVM_DIR && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"

# ENV NODE_PATH=$NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
# ENV PATH=$NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH



ENV HOSTNAME=0.0.0.0

WORKDIR /app
COPY . .

RUN node -v
RUN npm ci
RUN npm run build
RUN npm install pm2 -g
EXPOSE 3000
CMD ["pm2-runtime", "start", "npm", "--", "dev"]



# FROM node:20.12.2-alpine AS base
# WORKDIR /app
# COPY . .

# # FROM base AS builder
# # WORKDIR /app
# RUN npm ci --force
# RUN npx -y playwright@latest install --with-deps
# RUN npm run build
# RUN cp -r public .next/standalone/
# RUN cp -r .next/static .next/standalone/.next/


    

# ENV PORT=3000
# ENV HOSTNAME="172.17.0.3"

# # # server.js is created by next build from the standalone output
# # https://nextjs.org/docs/pages/api-reference/next-config-js/output
# CMD ["node", ".next/standalone/server.js"]


# # syntax=docker.io/docker/dockerfile:1

# FROM node:20-alpine AS base

# # Install dependencies only when needed
# FROM base AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# # # Install dependencies based on the preferred package manager
# # COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
# # RUN \
# #   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
# #   elif [ -f package-lock.json ]; then npm ci; \
# #   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
# #   else echo "Lockfile not found." && exit 1; \
# #   fi


# # # Rebuild the source code only when needed
# # FROM base AS builder
# # WORKDIR /app
# # COPY --from=deps /app/node_modules ./node_modules
# # COPY . .

# # Next.js collects completely anonymous telemetry data about general usage.
# # Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line in case you want to disable telemetry during the build.
# # ENV NEXT_TELEMETRY_DISABLED=1

# RUN \
#   npm ci \
#   npm run build \
#   npm start

#   # if [ -f yarn.lock ]; then yarn run build; \
#   # elif [ -f package-lock.json ]; then npm run build; \
#   # elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
#   # else echo "Lockfile not found." && exit 1; \
#   # fi

# # Production image, copy all the files and run next
# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# # Uncomment the following line in case you want to disable telemetry during runtime.
# # ENV NEXT_TELEMETRY_DISABLED=1

# # RUN addgroup --system --gid 1001 nodejs
# # RUN adduser --system --uid 1001 nextjs

# # COPY --from=builder /app/public ./public

# # Set the correct permission for prerender cache
# # RUN mkdir .next
# # RUN chown nextjs:nodejs .next

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# # COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# # COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# #USER nextjs

# EXPOSE 3000

# ENV PORT=3000

# # server.js is created by next build from the standalone output
# # https://nextjs.org/docs/pages/api-reference/next-config-js/output
# ENV HOSTNAME="0.0.0.0"
# CMD ["node", "server.js"]