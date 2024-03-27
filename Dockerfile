FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
ENV VITE_SERVER_URL="http://localhost:7000"
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile \
    && pnpm run -r build \
    && pnpm deploy -F server -P /prod/server \
    && mv apps/web/dist /prod/web && mv apps/web/nginx.conf /prod/web

FROM base AS server
COPY --from=build /prod/server /prod/server
WORKDIR /prod/server
RUN ls -aR
ENV PORT=7000
ENV ORIGIN="http://localhost:5173"
ENV CLEAR_MESSAGES_INTERVAL=600000
EXPOSE $PORT
CMD [ "pnpm", "start" ]

FROM nginx:alpine AS web
COPY --from=build /prod/web /usr/share/nginx/html
COPY --from=build /prod/web/nginx.conf /etc/nginx/conf.d/default.conf
CMD [ "nginx", "-g", "daemon off;" ]
