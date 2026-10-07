# Prompt para pegar en Claude Code (en la carpeta del proyecto del site)

> Copia la carpeta `seo-galeano/` dentro de la raíz del proyecto y pega TODO lo de abajo en Claude Code.

---

Eres un ingeniero senior de SEO técnico y frontend. Este repositorio es el site estático de **Grupo Galeano Cabeleireiros** (Studio 316 Aveiro + Ílhavo Plaza Cabeleireiros), desplegado en Vercel, dominio final **https://galeanocabeleireiro.com** (sin www). En `./seo-galeano/` tienes los archivos preparados. Haz lo siguiente, en orden, sin preguntarme salvo que algo sea irreversible:

## 1. Detectar estructura
- Localiza la carpeta pública que Vercel sirve (raíz, `public/`, `dist/`…) y los HTML: `index.html`, `espaco-aveiro.html`, `espaco-ilhavo.html` y cualquier otro.
- Si hay `vercel.json`, **fusiona** con `seo-galeano/vercel.json` (no lo sobrescribas). Si no hay, cópialo a la raíz.

## 2. Corregir el bug crítico de dominio
- Busca en TODO el repo `studio316-aveiro.vercel.app` y reemplázalo por `galeanocabeleireiro.com` (canonical, og:url, og:image, enlaces absolutos, JS, sitemaps, manifest).
- Ahora mismo el canonical apunta al dominio de Vercel: Google indexa el dominio equivocado. Esto es la prioridad nº 1.

## 3. Archivos raíz
- Copia a la carpeta pública: `seo-galeano/public/robots.txt`, `sitemap.xml`, `llms.txt`, `.well-known/security.txt`.
- Si hay más páginas HTML indexables que las 3 del sitemap, añádelas al sitemap.

## 4. `<head>` de cada página
- Para cada página, sustituye title, meta description, canonical, robots, Open Graph y Twitter por los de `seo-galeano/snippets/head-*.html`, y añade el bloque JSON-LD tal cual.
- Pon `<html lang="pt-PT">`.
- No dupliques metas existentes: reemplázalas.
- El selector de idioma (PT/ES/EN/DE/FR) es por JS en la misma URL: deja el contenido en portugués en el HTML inicial (es lo que Google indexa). No añadas hreflang mientras no existan URLs separadas por idioma.

## 5. Contenido on-page (SEO local)
- `index.html`: el `<h1>` debe incluir la intención local. Cambia a algo como: `Cabeleireiro em Aveiro e Ílhavo — dois espaços, a mesma excelência` (mantén el estilo/itálica actual).
- `espaco-aveiro.html`: `<h1>` → `Cabeleireiro em Aveiro: transformações reais` y añade un párrafo visible (80–120 palabras) con: dirección, horario (seg, ter, qui, sex, sáb 10h–19h; encerra quarta e domingo), servicios clave (loiros, madeixas, balayage, correção de cor, unhas de gel, pestanas, massagem) y zonas próximas (centro de Aveiro, Glória e Vera Cruz, Esgueira).
- `espaco-ilhavo.html`: `<h1>` → `Cabeleireiro em Ílhavo: transformações reais` + párrafo equivalente (Hotel Ílhavo Plaza, 3.º andar; Ílhavo, Gafanha da Nazaré, Costa Nova, Barra).
- Añade sección FAQ visible en cada página de local (4–5 preguntas: horario, cómo marcar, estacionamiento, precios orientativos, si atienden sin marcación) — **solo con datos reales**; si no los sabes, deja `<!-- TODO -->` y avísame.
- Imágenes sin `alt` (p. ej. `pilar-cabelo.jpg`, `pilar-unhas.jpg`, `pilar-estetica.jpg`): añade alt descriptivo con palabra clave natural.
- Las imágenes `3921710401537984751.jpg` etc. tienen nombres numéricos: **no las renombres** (rompería URLs indexadas) salvo que añadas redirect 301 en vercel.json.
- Enlaces internos: desde la home enlaza a cada local con anchor text descriptivo ("Cabeleireiro em Aveiro — Studio 316", "Cabeleireiro em Ílhavo"). Corrige enlaces a `index.html#...` para que apunten a `/#...`.

## 6. Rendimiento (Core Web Vitals)
- Convierte JPG/PNG a WebP/AVIF (usa `sharp` o `squoosh`), con `<picture>` y fallback JPG; máx. 1600 px de ancho; calidad ~78.
- `width` y `height` explícitos en todas las `<img>` (evita CLS).
- `loading="lazy"` + `decoding="async"` en todo lo que esté bajo el primer pantallazo; la imagen hero con `fetchpriority="high"` y `<link rel="preload" as="image">`.
- Vídeos: `preload="none"`, `poster=` con imagen ligera, `muted playsinline`; no autoplay de audio. El `ambience.mp3` solo debe cargarse al pulsar "Som".
- Fuentes: `font-display: swap` y `preconnect` a su origen.
- Scripts no críticos con `defer`.
- Mide con Lighthouse (móvil) antes/después y dame los números (LCP, CLS, INP, Performance, SEO, Accessibility).

## 7. Analítica y cookies
- Inserta `seo-galeano/snippets/ga4-consent.html` (parte `<head>` al inicio del head; banner antes de `</body>`) en todas las páginas. Deja `G-XXXXXXXXXX` como placeholder si no te doy el ID.

## 8. Páginas legales (Portugal, obligatorias)
Crea con el mismo estilo visual del site, y enlázalas en el footer de todas las páginas:
- `politica-privacidade.html` (RGPD: responsable, finalidades, base legal, plazos, derechos, contacto, CNPD como autoridad de control).
- `politica-cookies.html` (lista de cookies: `_ga`, `_ga_*`, `galeano_consent`; cómo revocar).
- En el footer: enlace al **Livro de Reclamações Eletrónico** → https://www.livroreclamacoes.pt/inicio (obligatorio en Portugal para negocios con web) y mención a la resolución alternativa de litigios (RAL) — centro de arbitraje de consumo de Coimbra/Aveiro (CACCDC).
- Datos de empresa que no conozcas (razão social, NIF, email): `<!-- TODO -->` y lístamelos al final.
- Añade ambas páginas al `sitemap.xml`.

## 9. Seguridad y calidad
- `rel="noopener noreferrer"` en todos los `target="_blank"`.
- Página `404.html` con enlaces a home y a los dos locales.
- Formularios (si existen): prueba envío, validación y honeypot anti-spam.
- Valida: JSON-LD en https://validator.schema.org (o con `npx structured-data-testing-tool` si puedes), HTML sin errores, ningún enlace roto (`npx linkinator http://localhost:8316 --recurse`).

## 10. Despliegue
- Haz commit con mensaje claro y `vercel --prod` (o push a la rama de producción).
- Verifica en producción con curl:
  - `curl -I https://studio316-aveiro.vercel.app/` → 308 hacia galeanocabeleireiro.com
  - `curl -I https://www.galeanocabeleireiro.com/` → 308 hacia el dominio sin www
  - `curl https://galeanocabeleireiro.com/robots.txt` y `/sitemap.xml` → 200
  - `curl -s https://galeanocabeleireiro.com/ | grep canonical` → dominio correcto
- Al terminar dame: lista de cambios, métricas Lighthouse antes/después, y lista de TODOs que necesitan datos míos.
