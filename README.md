# Pizza Estofada · Landing page

Landing page de Pizza Estofada (Bogotá): menú, 6 sedes en un mapa real y pedidos por WhatsApp a cada sede.

Hecha con React 19, Vite y Tailwind CSS 4.

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Publicar en GitHub Pages

```bash
pnpm publicar
```

Compila la página y la sube a la rama `gh-pages`. Queda publicada en
https://jamtes44.github.io/pizzaestofada/

## Dónde se editan los datos

Todo está en `src/App.tsx`:

- `products`: productos del menú, descripciones y precios.
- `branches`: sedes, direcciones, WhatsApp y coordenadas del mapa.
- `menuPdf`: enlace a la carta completa.
