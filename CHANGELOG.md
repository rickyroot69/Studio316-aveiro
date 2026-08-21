# Studio 316 — Changelog

Cambios sobre `index.html` (proyecto en `/home/ricky/Projectos/Hotel/Peluqueria/`).
Server local dev: `python3 -m http.server 8080` desde la raíz del proyecto.
Producción: https://studio316-aveiro.vercel.app

## Layout

```
Peluqueria/
├── index.html
├── assets/
│   ├── audio/ambience.mp3            (4.7 MB)
│   └── img/
│       ├── galeano-logo.png          (logo Grupo Cabeleireiro Galeano)
│       ├── massagem-1.jpg
│       └── massagem-2.jpg
└── videos/
    ├── apresentacao-studio316.mp4    (hero)
    └── ig/
        ├── cabelo-merece-melhor.mp4  (6.2 MB, vídeo 1 de Cabello)
        ├── poster/cabelo-merece-melhor.jpg
        ├── marcacao-telefone.mp4     (3.2 MB, vídeo 2 de Estética)
        └── poster/marcacao-telefone.jpg
```

## Paleta activa

```
:root {
  --ink: #4A1F8C;        /* violeta vivo */
  --ink-deep: #2E0F5C;   /* violeta profundo */
  --leaf: #8A4FE8;       /* violeta claro / acentos */
  --brass: #C8CDD7;      /* plateado frío */
  --ivory: #E8DCC4;      /* champagne */
  --paper: #fffdf8;      /* blanco cálido */
  --rose: #D4B5C6;       /* blush */
  --charcoal: #4A1F8C;
}
```

## Secciones (orden vertical, alternando colores)

| # | Sección | Fondo |
|---|---------|-------|
| 1 | Nav header (fixed) | violeta |
| 2 | Locations (Dois espaços) | plateado + logo Galeano |
| 3 | Hero (vídeo apresentação) | negro / vídeo |
| 4 | Services (Tudo para se sentir) | violeta |
| 5 | Flyers (campanhas) | plateado |
| 6 | Feature / Loiro dos sonhos | violeta |
| 7 | Transformation-lab (Arraste) | violeta |
| 8 | Diagnosis (Cada cabelo é único) | plateado |
| 9 | Lookbook (Transformações reais) | violeta |
| 10 | Wellbeing (Cuidar de si) | plateado |
| 11 | Contact | violeta |
| 12 | Footer | violeta |
| — | Marquee banda deslizante | plateado |

## Cambios

### Visual
- Paleta verde/bronce → violeta/plateado (variables CSS `:root`).
- Theme-color + favicon actualizados al nuevo violeta.
- Eyebrow `::before` (línea decorativa) desactivado en todas las secciones.
- Sección `.intro` ocultada (`hidden` + `display:none`).
- `.diagnosis-copy { align-self: start }` (era `center` → el texto se centraba contra la imagen alta y dejaba un gap falso).
- Header violeta fijo + scrolled translúcido.

### Vídeos
- Cabello (servicio 01): vídeo 1 reemplazado por `cabelo-merece-melhor.mp4`. Vídeo 2 = `loiro-dos-sonhos.mp4`.
- Estética (servicio 03): vídeo 1 con `data-slow="0.3"` (3.3× más lento). Vídeo 2 reemplazado por `marcacao-telefone.mp4`.
- Wellbeing: 2 vídeos (maos, pedicure) → 2 imágenes (`massagem-1.jpg`, `massagem-2.jpg`).
- JS: `playbackRate` aplicado antes del IntersectionObserver.

### CTAs / i18n
- 3 CTAs por local (Ligar / WhatsApp / Abrir no mapa) en PT como source + 5 idiomas en dict.
- `Marcar por WhatsApp` (era solo "WhatsApp").
- Fuente dict actualizada con traducciones ES/EN/DE/FR coherentes.
- "Dois espaços pensados para si." (antes "Dois espaços.").

### Logo
- Logo Galeano (`assets/img/galeano-logo.png`) en el `.locations-head` (a la izquierda del h2, 14rem).
- Reemplaza el section-tag "Grupo Cabeleireiro Galeano".

### Lookbook
- Botón "Meus looks 0" ocultado (`hidden` + `[hidden]{display:none}`). JS de likes en shots intacto.

### Audio
- `assets/audio/ambience.mp3` (4.7 MB, guitarra acústica).
- `<audio autoplay loop preload="auto">` con `ambience.play().catch(()=>{})` de respaldo.
- Botón `.sound-toggle` (icono barras + texto "Som") ya existente → play/pause.

### Responsive
- `.button { min-height: 2.75rem }` (44px touch target).
- Resto (4 media queries, 27 `clamp()`, grid/flex, `body { overflow-x: hidden }`, `img { width:100%; height:100% }`) ya estaba del esquema original.

## i18n (dict PT source)

CTAs traducidos:
- `Ligar agora` → ES: Llamar ahora / EN: Call now / DE: Jetzt anrufen / FR: Appeler maintenant
- `Marcar por WhatsApp` → ES: Pedir cita por WhatsApp / EN: Book on WhatsApp / DE: Per WhatsApp buchen / FR: Réserver sur WhatsApp
- `Abrir no mapa ↗` → ES: Abrir en Google Maps ↗ / EN: Open in Google Maps ↗ / DE: In Google Maps öffnen ↗ / FR: Ouvrir dans Google Maps ↗

## Deploy

```
vercel --prod --yes
▲ Aliased   https://studio316-aveiro.vercel.app
✓ Ready in ~10s
```

## Pendiente

- git init + commit (no había repo).
- Acortar URLs a dominio propio si compran `studio316aveiro.pt`.
- `og-image.jpg` actual (es antiguo) — regenerar con el branding violeta.
- Calibrar `prefers-reduced-motion` autoplay (algunos Safari móviles lo bloquean).
