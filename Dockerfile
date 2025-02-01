FROM node:22-alpine

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY nuxt.config.ts nuxt.config.ts
COPY tsconfig.json tsconfig.json

COPY app.vue app.vue
COPY public public
COPY layouts layouts
COPY components components
COPY utils utils
COPY pages pages
RUN npm run build && rm -rf node_modules

ENTRYPOINT ["node", ".output/server/index.mjs"]