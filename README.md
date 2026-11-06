# 🗺️ Mapa Trendy MX

Mapa retro estilo RPG pixel-art con **heat map** de los spots más trendy de México: restaurantes, vida nocturna, cultura y lo que está en tendencia.

## Cómo se juega
- **Flechas / WASD**: camina con tu explorador (el mundo se mueve, tú quedas al centro)
- **Enter / Z / botón A**: cuando aparece `!`, explora el spot
- **Esc / X / botón B**: cerrar el cuadro de diálogo
- Filtros por categoría, heat map on/off, saltos rápidos por región y ranking Top Trending
- En móvil aparecen una cruceta y botones A/B

## Correr local
```bash
npm start   # http://localhost:3000
```
Sin dependencias: `server.js` usa sólo módulos nativos de Node.

## Stack
- [Leaflet](https://leafletjs.com) + [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat)
- Tiles de OpenStreetMap pixelados (zoomOffset −1 + `image-rendering: pixelated` + filtro SVG de posterizado)
- Sprites pixel-art generados como SVG desde mapas de caracteres
- Fuente Press Start 2P

## Datos
`public/data.js` es una muestra curada a mano. El valor `heat` (0–1) es editorial, no viene de una API en vivo.

## Deploy
Railway detecta Node automáticamente y corre `npm start` (usa la variable `PORT`).
