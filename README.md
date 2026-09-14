# Studio 316 — Grupo Galeano Cabeleireiros

Site estatico de cinco paginas. Sem framework, sem build: os ficheiros que estao
no repositorio sao os que o servidor entrega.

## Paginas

| Ficheiro | O que e |
|---|---|
| `index.html` | Landing do grupo, com os dois locais |
| `aveiro.html` | Studio 316 · Aveiro |
| `ilhavo.html` | Ílhavo Plaza Cabeleireiros |
| `espaco-aveiro.html` | Galeria de trabalhos de Aveiro |
| `espaco-ilhavo.html` | Galeria de trabalhos de Ílhavo |

## Estrutura

```
index.html …            estrutura (so HTML)
assets/
  css/
    tokens.css          design tokens partilhados + mapa de nomes e breakpoints
    base.css            regras identicas nas cinco paginas
    paginas/<pagina>.css  estilo proprio de cada pagina (inclui a sua paleta)
  js/
    dict.js             dicionario de traducoes, unico para todo o site
    paginas/<pagina>.js comportamento de cada pagina
  img/  badges/         imagens da interface
galeria/ trabalhos/ ilhavo/ campanhas/ videos/   fotografia e video
```

A ordem de carregamento e sempre a mesma e importa:

```html
<link rel="stylesheet" href="assets/css/tokens.css">   <!-- tokens  -->
<link rel="stylesheet" href="assets/css/base.css">     <!-- comum   -->
<link rel="stylesheet" href="assets/css/paginas/X.css"><!-- pagina  -->
...
<script src="assets/js/dict.js"></script>              <!-- dados   -->
<script src="assets/js/paginas/X.js"></script>         <!-- logica  -->
```

O CSS da pagina vem depois do comum para poder sobrepor-se. Por isso o bloco
`@media (pointer: coarse)`, que e uma camada de override, fica no fim da folha
da pagina e nao em `base.css`.

## Convencao de nomes

- Classes em **ingles** e em `kebab-case`: `contact-card`, `strip-photo`,
  `badge-wa`. Excecao: nomes proprios do negocio (`local`, `locations`) que sao
  iguais nas duas linguas.
- **Bloco e elemento separados por hifen**: `strip`, `strip-rail`, `strip-track`,
  `strip-photo`, `strip-nav`, `strip-arrow`.
- **Variante com prefixo do bloco**: `badge-tel`, `badge-wa`, `badge-map`.
- **Estado como classe solta**: `open`, `active`, `liked`, `filtered-out`.
- Ganchos de JavaScript usam `data-*`, nao classes: `[data-strip]`, `[data-lang]`.
  Assim uma classe pode mudar de nome sem partir o comportamento.
- Comentarios em CSS e JS explicam **porque**, nao o que: o que se le no codigo.

Os dois carrosseis tem nomes diferentes de proposito: `strip-*` e a tira de fotos
do index; `gallery`/`shot` e o lookbook horizontal das paginas de local.

## Tokens e breakpoints

Os nomes dos tokens e a escala de breakpoints estao documentados no topo de
`assets/css/tokens.css`. Resumo:

- `480px` telemovel largo · `768px` tablet vertical · `1024px` duas colunas e
  menu completo · `1280px` ecra grande.
- As cores mudam de pagina para pagina (cada local tem a sua paleta) e por isso
  vivem no `:root` de cada folha em `css/paginas/`.

## Traducoes

`assets/js/dict.js` tem um objeto `window.STUDIO316_DICT` com as chaves em
portugues e os valores por ordem `[es, en, de, fr]`. Cada pagina percorre os nos
de texto e troca-os. O que **nao** se traduz leva `translate="no"`: nomes
proprios, numeros de telefone, moradas e o seletor de idiomas.

Ao mudar um texto no HTML e preciso mudar a chave correspondente no dicionario.

## Desenvolvimento

```sh
python3 -m http.server 8316     # a partir da raiz do projeto
```

## Publicacao

O site e estatico: nao ha passo de build, o que esta no repositorio e o que o
servidor entrega. O `vercel.json` fixa isso, para que a escolha de preset no
painel da Vercel nao mude nada:

| Definicao | Valor |
|---|---|
| Framework Preset | Other |
| Build Command | (vazio) |
| Output Directory | `.` (a raiz) |
| Install Command | (vazio) |
| Production Branch | **`master`** |

O ramo principal deste repositorio chama-se `master`, nao `main`. Sem trocar o
Production Branch na Vercel, os pushes nao publicam nada.

Com o repositorio ligado, cada push para `master` publica. Sem ligacao, publica-se
a partir da maquina com `vercel --prod`.
