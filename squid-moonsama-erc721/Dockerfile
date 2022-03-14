FROM node:16 AS builder
WORKDIR /squid-build
ADD package.json .
ADD package-lock.json .
RUN npm ci
ADD tsconfig.json .
ADD src src
RUN npm run build


FROM node:16 AS processor
WORKDIR /squid-project
ADD package.json .
ADD package-lock.json .
RUN npm ci # TODO: --production
COPY --from=builder /squid-build/lib lib
ADD db db
ADD manifest.yml .
ADD schema.graphql .
ADD .env .
CMD ["npm", "run", "processor:start"]


FROM processor AS query-node
CMD ["node", "./lib/generated/server.js"]