# Build en una imagen, servir en otra: la imagen final no lleva Node, ni el
# node_modules, ni el codigo fuente. Son ~50 MB de nginx contra ~1,5 GB si se
# sirviera con `ng serve`, y `ng serve` ademas es un dev-server: no va a
# produccion ni de casualidad.

# --- build ---------------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Primero el manifiesto y el lock, y recien despues el codigo: mientras las
# dependencias no cambien, Docker reusa la capa del npm ci y el rebuild no
# vuelve a bajar nada.
COPY package.json package-lock.json ./
# `ci` y no `install`: instala exactamente el lock y falla si no coincide, que
# es lo que hace reproducible el build.
RUN npm ci

COPY . .
RUN npm run build

# --- runtime -------------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Angular 21 emite en dist/<proyecto>/browser.
COPY --from=build /app/dist/frontend-users/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
