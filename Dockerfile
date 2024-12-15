# Stage 1: Install dependencies
FROM node:alpine As deps

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile

# Stage 2: Build the app
FROM node:alpine As builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN yarn build

# Stage 3: Run the app
FROM node:alpine As runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start"]