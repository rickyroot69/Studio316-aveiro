#!/usr/bin/env bash
# Regenera og-image-v2.jpg (1200x630, paleta violeta).
# Requiere: imagemagick (magick), chromium.
# Uso: bash tools/build-og.sh   (desde la raiz del proyecto)
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=og-image-v2.jpg
FOTO=9.jpg                                  # interior Studio 316 Aveiro
LOGO=assets/img/galeano-logo-prata.png      # Galeano en plata
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT

# Foto -> duotono violeta (#190630 sombras -> #CDC0E9 luces) + vineta
magick "$FOTO" -gravity center -crop 1412x1648+0+0 +repage \
  -resize 700x724^ -gravity center -extent 700x724 \
  -colorspace Gray -normalize -sigmoidal-contrast 4x48% \
  +level-colors '#190630','#CDC0E9' \
  \( -size 700x724 radial-gradient:'rgba(0,0,0,0)'-'rgba(0,0,0,0.42)' -resize 700x724! \) \
  -compose Over -composite "$TMP/duo.png"

cat > "$TMP/og.html" <<EOF
<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;
       background:linear-gradient(118deg,#2A0C55 0%,#4A1F8C 58%,#5A2AA3 100%);
       font-family:"Geist","DejaVu Sans",sans-serif;position:relative}
  .grain{position:absolute;inset:0;
       background:radial-gradient(circle at 80% 10%, rgba(138,79,232,.42), transparent 55%),
                  radial-gradient(circle at 6% 94%, rgba(30,8,60,.9), transparent 62%)}
  .photo{position:absolute;top:0;right:0;width:700px;height:630px;overflow:hidden}
  .photo img{width:700px;height:724px;object-fit:cover;margin-top:-47px}
  .photo::after{content:"";position:absolute;inset:0;
       background:linear-gradient(90deg,#3B1571 0%,rgba(59,21,113,.99) 8%,rgba(62,23,120,.86) 24%,rgba(74,31,140,.34) 52%,rgba(74,31,140,.04) 100%)}
  .wrap{position:absolute;inset:0;padding:64px 0 60px 76px;width:720px;
        display:flex;flex-direction:column;justify-content:space-between;z-index:3}
  .logo{width:118px}
  h1{font-family:"Noto Serif Display","P052",Georgia,serif;font-weight:300;
     font-size:62px;line-height:1.06;color:#F7F3FF;letter-spacing:-.5px;max-width:600px}
  h1 em{display:block;font-style:italic;color:#D6C9F3}
  .rule{width:104px;height:2px;background:linear-gradient(90deg,#C8CDD7,rgba(200,205,215,0));margin:26px 0 20px}
  .salons{font-size:21px;font-weight:500;color:#EFEAFB}
  .salons span{color:#B49BE8;margin:0 12px}
  .foot{font-size:13px;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:#C8CDD7}
</style></head><body>
  <div class="grain"></div>
  <div class="photo"><img src="data:image/png;base64,$(base64 -w0 "$TMP/duo.png")"></div>
  <div class="wrap">
    <img class="logo" src="data:image/png;base64,$(base64 -w0 "$LOGO")">
    <div>
      <h1>Dois salões,<em>a mesma excelência.</em></h1>
      <div class="rule"></div>
      <div class="salons">Studio 316 · Aveiro <span>—</span> Hotel Ílhavo Plaza</div>
    </div>
    <div class="foot">Cabelo · Unhas · Estética · Massagem</div>
  </div>
</body></html>
EOF

chromium --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1200,630 --screenshot="$TMP/og2x.png" "file://$TMP/og.html" 2>/dev/null
magick "$TMP/og2x.png" -resize 1200x630 -sampling-factor 4:2:0 -quality 88 -strip "$OUT"
cp "$OUT" og-image.jpg
echo "OK -> $OUT ($(du -h "$OUT" | cut -f1))"
