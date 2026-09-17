# Feliz Cumpleaños, Marta 💛

Web sorpresa de cumpleaños hecha con Angular: pantalla de carga, una portada
con una polaroid de fotos, y una carta que se revela al abrir el sobre.

Se publica automáticamente en GitHub Pages en cada push a `main`, en:

https://claudiusava.github.io/feliz-cumple-marta/

## Personalizar

Todo lo editable está centralizado, no hace falta tocar el resto del código:

- **Nombre, fecha y frase de portada**: [`src/app/config.ts`](src/app/config.ts).
- **Fotos**: sustituye los archivos en `src/assets/images/` (`foto-1.svg`,
  `foto-2.svg`, `foto-3.svg` para la polaroid, `foto-final.svg` para la foto
  final) por vuestras fotos reales. Puedes usar `.jpg`/`.png`: solo cambia la
  extensión en las rutas de `hero.component.ts` y `letter.component.html`.
- **Texto de la carta**: [`src/app/components/letter/letter.component.html`](src/app/components/letter/letter.component.html).

## Desarrollo local

```bash
npm install
npm start
```

Abre `http://localhost:4200`.

## Despliegue

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
compila y publica en GitHub Pages automáticamente en cada push a `main`. No
hace falta hacer nada manualmente.
