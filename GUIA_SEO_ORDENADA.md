# Guía SEO ordenada — galeanocabeleireiro.com
Grupo Galeano Cabeleireiros · Studio 316 Aveiro + Ílhavo Plaza Cabeleireiros
Diagnóstico: 6 oct 2026

## Diagnóstico: por qué no aparecéis en Google

| # | Problema encontrado | Gravedad |
|---|---|---|
| 1 | El `canonical` y `og:url` de todas las páginas apuntan a **studio316-aveiro.vercel.app**. Le estáis diciendo a Google que la versión "oficial" es la de Vercel, no vuestro dominio. | 🔴 Crítico |
| 2 | **studio316-aveiro.vercel.app** sirve el mismo site sin redirigir → contenido duplicado. | 🔴 Crítico |
| 3 | `robots.txt` y `sitemap.xml` → **404**. | 🟠 Alto |
| 4 | Sin datos estructurados (JSON-LD `HairSalon`) para ninguno de los dos locales. | 🟠 Alto |
| 5 | Títulos de las páginas de local genéricos ("O espaço") sin "cabeleireiro em Aveiro/Ílhavo". | 🟠 Alto |
| 6 | Ficha de Google de **Ílhavo** vacía: sin horario, teléfono, reseñas ni fotos. Ficha de **Aveiro** con categoría "Salão de beleza" en vez de "Cabeleireiro" y solo 14 reseñas. | 🟠 Alto |
| 7 | Sin GA4 ni banner de cookies; faltan política de privacidad y **Livro de Reclamações** (obligatorio en PT). | 🟡 Medio / legal |
| 8 | Muchos vídeos, audio y JPG pesados → riesgo de LCP lento en móvil. | 🟡 Medio |

Leyenda: **[CC]** lo hace Claude Code solo · **[TÚ]** necesita tu cuenta/acceso (5–15 min cada uno).

---

## Orden correcto de ejecución

### 1. Dominio, HTTPS y redirecciones 301 — [CC] + [TÚ 2 min]
- [CC] Reemplazar `studio316-aveiro.vercel.app` → `galeanocabeleireiro.com` en todo el código.
- [CC] `vercel.json`: redirección permanente (Vercel usa **308**, equivalente a 301 para Google) de `studio316-aveiro.vercel.app` y `www` → `https://galeanocabeleireiro.com`.
- [CC] Cabeceras de seguridad: HSTS, nosniff, X-Frame-Options, Referrer-Policy.
- [TÚ] En Vercel → Project → Settings → Domains: confirma que `galeanocabeleireiro.com` es el dominio principal y `www` está añadido. SSL lo emite Vercel automáticamente.

### 2. robots.txt — [CC] ✅ archivo listo
Permite todo, bloquea solo audio y archivos internos, y enlaza el sitemap.

### 3. sitemap.xml — [CC] ✅ archivo listo
3 URLs + sitemap de imágenes (ayuda a aparecer en Google Imágenes con "balayage Aveiro", etc.).

### 4. Títulos, meta descripciones y datos estructurados — [CC] ✅ snippets listos
| Página | Nuevo `<title>` |
|---|---|
| Home | Cabeleireiro em Aveiro e Ílhavo \| Studio 316 · Grupo Galeano |
| Aveiro | Cabeleireiro em Aveiro \| Studio 316 — Madeixas, Balayage e Unhas |
| Ílhavo | Cabeleireiro em Ílhavo \| Ílhavo Plaza Cabeleireiros (Hotel Ílhavo Plaza) |

JSON-LD: `Organization` (grupo) + un `HairSalon` por local con dirección, coordenadas, horario, teléfono, Instagram, catálogo de servicios y botón de reserva (Koibox). Así Google entiende que son **dos negocios locales** del mismo grupo.

### 5. Palabras clave (mapa por página) — [CC]
| Página | Principal | Secundarias / long tail |
|---|---|---|
| Home | cabeleireiro Aveiro, cabeleireiro Ílhavo | salão de beleza Aveiro, cabeleireiro perto de mim |
| Aveiro | cabeleireiro em Aveiro | madeixas Aveiro, balayage Aveiro, loiro Aveiro, correção de cor Aveiro, unhas de gel Aveiro, extensão de pestanas Aveiro, massagem Aveiro |
| Ílhavo | cabeleireiro em Ílhavo | cabeleireiro Gafanha da Nazaré, cabeleireiro Costa Nova, manicure Ílhavo, salão de beleza Ílhavo |
Uso: en H1, primer párrafo, alt de imágenes, FAQ y respuestas a reseñas. Sin repetir de forma forzada.

### 6. Velocidad y Core Web Vitals — [CC]
Objetivo móvil: LCP < 2,5 s · INP < 200 ms · CLS < 0,1. WebP/AVIF, `width/height`, lazy-load, vídeos con `preload="none"`, audio solo al pulsar, caché de 1 año para assets (ya en `vercel.json`). Comprobar en https://pagespeed.web.dev

### 7. Páginas legales, cookies y seguridad — [CC] + [TÚ datos]
- Política de privacidad (RGPD), política de cookies, banner con Consent Mode v2.
- **Livro de Reclamações Eletrónico** en el footer (obligatorio en Portugal).
- 404 personalizada, `noopener` en enlaces externos, `security.txt`.
- [TÚ] Facilitar: razão social, NIF y email de contacto.
- Copias de seguridad: el repo en GitHub + Vercel guarda cada despliegue (rollback en 1 clic). Basta con asegurar que el código está en GitHub.

### 8. Desplegar — [CC]
Claude Code despliega y comprueba con `curl` redirecciones, robots, sitemap y canonical.

### 9. Google Search Console — [TÚ 10 min]
1. https://search.google.com/search-console → Añadir propiedad → **Dominio** → `galeanocabeleireiro.com`.
2. Copia el registro TXT y pégalo en el DNS donde compraste el dominio (o en Vercel → Domains si los DNS están en Vercel). Verificar.
3. Sitemaps → enviar `https://galeanocabeleireiro.com/sitemap.xml`.
4. Inspección de URL → pegar cada una de las 3 URLs → **Solicitar indexación**.
5. Bonus 2 min: https://www.bing.com/webmasters → "Importar desde Google Search Console" (Bing alimenta también a ChatGPT y Copilot).

### 10. Perfil de Empresa en Google (los dos locales) — [TÚ 15 min] ⭐ lo que más mueve el SEO local
**Studio 316 Aveiro** (ficha existente, 4,9★, 14 reseñas):
- Categoría principal → **Cabeleireiro**; secundarias: Salão de beleza, Salão de manicure, Serviço de extensão de pestanas, Massagista.
- Sitio web → `https://galeanocabeleireiro.com/espaco-aveiro.html` (la URL del local, no la home).
- Enlace de reserva → Koibox. Añadir servicios con precios, 10+ fotos reales, descripción con palabras clave.

**Ílhavo Plaza Cabeleireiros** (ficha existente pero casi vacía):
- Reclamar/verificar la ficha si no está en tu cuenta. Añadir horario, teléfono +351 913 456 651, categoría **Cabeleireiro**, web `…/espaco-ilhavo.html`, fotos, descripción mencionando "no Hotel Ílhavo Plaza, 3.º andar".
- El nombre debe ser **idéntico** en Google, web e Instagram (ahora Google dice "Ílhavo Plaza Cabeleireiro" y la web "Cabeleireiros"): elegid uno.

**Reseñas** (el factor nº 1 del mapa): pedir reseña a cada cliente con un QR/enlace corto en el mostrador y en el WhatsApp de confirmación. Responder todas.

### 11. Google Analytics 4 — [TÚ 5 min] + [CC]
- [TÚ] https://analytics.google.com → crear propiedad → flujo web → copiar el ID `G-…` y dárselo a Claude Code.
- [CC] Ya mide: clic en reservar, llamar, WhatsApp, Instagram y "cómo llegar", separados por local. Marca `booking_click`, `phone_click` y `whatsapp_click` como **eventos clave** en GA4.
- Si hacéis anuncios en Meta: añadir el Pixel detrás del mismo consentimiento.

### 12. llms.txt — [CC] ✅ archivo listo
Opcional y no oficial; resume los dos locales para asistentes de IA. No garantiza nada, pero no cuesta nada.

### Continuo (mensual)
- Una publicación en el Perfil de Empresa de cada local por semana (campañas, antes/después).
- Revisar Search Console → Páginas y Rendimiento.
- Mismo nombre, dirección y teléfono (NAP) en Instagram, Facebook, Koibox, Páginas Amarelas, TripAdvisor (Ílhavo, por el hotel), Fresha/Treatwell si se usan.
- Pedir al Hotel Ílhavo Plaza que enlace al salón desde su web (backlink local muy valioso).

## Expectativas realistas
- Indexación de las 3 páginas: **días a 2 semanas** tras Search Console.
- Aparecer en el mapa ("cabeleireiro perto de mim"): depende sobre todo del Perfil de Empresa y las reseñas; mejoras visibles en **4–8 semanas**.
