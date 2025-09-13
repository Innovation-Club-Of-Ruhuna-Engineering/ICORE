FROM node:22-alpine AS deps
WORKDIR /app

# Copy only the files needed to install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies with the preferred package manager
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./

# Copy the rest of the files
COPY . .

# Run build with the preferred package manager and verify dist directory exists
RUN \
  if [ -f package-lock.json ]; then npm run build && ls -la dist/; \
  elif [ -f yarn.lock ]; then yarn build && ls -la dist/; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build && ls -la dist/; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Set NODE_ENV environment variable
ENV NODE_ENV production
ENV DATABASE_URL=""
ENV JWT_ACCESS_TOKEN_SECRET=""
ENV JWT_ACCESS_TOKEN_EXPIRATION=""
ENV JWT_REFRESH_TOKEN_EXPIRATION=""
ENV JWT_REFRESH_TOKEN_SECRET=""
ENV PORT=5000


# Re-run install only for production dependencies
RUN \
  if [ -f package-lock.json ]; then npm ci --only=production && npm cache clean --force; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile --production && yarn cache clean; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile --prod; \
  else echo "Lockfile not found." && exit 1; \
  fi


FROM node:22-alpine AS runner
WORKDIR /app

# Copy necessary files from builder stage
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

# Use the node user from the image
USER node

# Verify dist directory contents before starting
RUN ls -la dist/ && ls -la dist/src/

# Start the server
CMD ["node", "dist/src/main.js"]