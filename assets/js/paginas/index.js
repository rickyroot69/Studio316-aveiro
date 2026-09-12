// Comportamento de index.html. O dicionario de traducoes vive em ../dict.js.

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (!location.hash) addEventListener('load', () => scrollTo(0, 0));

const header = document.querySelector('.header');
const progress = document.querySelector('.topline');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const ambience = document.getElementById('ambience');
const soundToggle = document.querySelector('.sound-toggle');
const soundLabel = soundToggle.querySelector('strong');
const languagePicker = document.querySelector('.language-picker');
const languageToggle = document.querySelector('.language-toggle');
const languageCode = languageToggle.querySelector('span');
const languageOptions = [...document.querySelectorAll('.language-option')];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  if (!CSS.supports('animation-timeline: view()')) {
    document.documentElement.classList.add('motion-fallback');
    const trendObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('trend-visible');
        trendObserver.unobserve(entry.target);
      }
    }), { threshold: .18 });
    document.querySelectorAll('.section-heading, .service').forEach(element => trendObserver.observe(element));
  }
}

const languageIndex = { es: 0, en: 1, de: 2, fr: 3 };
const languageMeta = {
  pt: { html: 'pt-PT', code: 'PT', menu: 'Menu', close: 'Fechar', sound: 'Som', pause: 'Pausa', choose: 'Escolher idioma', play: 'Reproduzir música ambiente', stop: 'Pausar música ambiente', compare: 'Comparar cabelo antes e depois', saveLook: 'Guardar look', removeLook: 'Remover look', savedToast: 'Look guardado ✦ Mostre-o na sua avaliação.', removedToast: 'Look removido.', emptyToast: 'Guarde primeiro um look que adore.' },
  es: { html: 'es', code: 'ES', menu: 'Menú', close: 'Cerrar', sound: 'Sonido', pause: 'Pausa', choose: 'Elegir idioma', play: 'Reproducir música ambiente', stop: 'Pausar música ambiente', compare: 'Comparar el cabello antes y después', saveLook: 'Guardar look', removeLook: 'Eliminar look', savedToast: 'Look guardado ✦ Muéstralo en tu diagnóstico.', removedToast: 'Look eliminado.', emptyToast: 'Guarda primero un look que te encante.' },
  en: { html: 'en', code: 'EN', menu: 'Menu', close: 'Close', sound: 'Sound', pause: 'Pause', choose: 'Choose language', play: 'Play ambient music', stop: 'Pause ambient music', compare: 'Compare hair before and after', saveLook: 'Save look', removeLook: 'Remove look', savedToast: 'Look saved ✦ Show it at your consultation.', removedToast: 'Look removed.', emptyToast: 'Save a look you love first.' },
  de: { html: 'de', code: 'DE', menu: 'Menü', close: 'Schließen', sound: 'Klang', pause: 'Pause', choose: 'Sprache wählen', play: 'Hintergrundmusik abspielen', stop: 'Hintergrundmusik pausieren', compare: 'Haare vorher und nachher vergleichen', saveLook: 'Look speichern', removeLook: 'Look entfernen', savedToast: 'Look gespeichert ✦ Zeigen Sie ihn bei Ihrer Beratung.', removedToast: 'Look entfernt.', emptyToast: 'Speichern Sie zuerst einen Lieblingslook.' },
  fr: { html: 'fr', code: 'FR', menu: 'Menu', close: 'Fermer', sound: 'Son', pause: 'Pause', choose: 'Choisir la langue', play: "Lire la musique d'ambiance", stop: "Mettre la musique d'ambiance en pause", compare: 'Comparer les cheveux avant et après', saveLook: 'Enregistrer le look', removeLook: 'Supprimer le look', savedToast: 'Look enregistré ✦ Montrez-le lors du diagnostic.', removedToast: 'Look supprimé.', emptyToast: "Enregistrez d'abord un look que vous aimez." }
};
const translations = window.STUDIO316_DICT;
document.querySelectorAll('.shot').forEach((shot, index) => {
  shot.dataset.look = `look-${index + 1}`;
  shot.insertAdjacentHTML('beforeend', `<button class="look-like" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.25 6.2 6.45 2.2-6.45 2.25L12 20l-2.25-6.55L3.3 11.2 9.75 9 12 2.8z"/></svg></button>`);
});
const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const parent = node.parentElement;
    return parent && node.nodeValue.trim() && !parent.closest('script, style, [translate="no"], .language-picker, .sound-toggle, .music-credit, .brand, .hero-meta')
      ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  }
});
while (walker.nextNode()) textNodes.push(walker.currentNode);
const originalText = new Map(textNodes.map(node => [node, node.nodeValue]));
let currentLang = 'pt';
let syncSavedLooks = () => {};

const closeLanguagePicker = () => {
  languagePicker.classList.remove('open');
  languageToggle.setAttribute('aria-expanded', 'false');
};
const applyLanguage = lang => {
  currentLang = languageMeta[lang] ? lang : 'pt';
  const meta = languageMeta[currentLang];
  const index = languageIndex[currentLang];
  document.documentElement.lang = meta.html;
  languageCode.textContent = meta.code;
  languageToggle.setAttribute('aria-label', meta.choose);
  document.querySelector('.compare-range')?.setAttribute('aria-label', meta.compare);
  textNodes.forEach(node => {
    const original = originalText.get(node);
    const key = original.trim();
    const translated = currentLang === 'pt' ? key : translations[key]?.[index];
    node.nodeValue = translated ? original.replace(key, translated) : original;
  });
  languageOptions.forEach(option => option.classList.toggle('active', option.dataset.lang === currentLang));
  toggle.textContent = nav.classList.contains('open') ? meta.close : meta.menu;
  setSoundState(!ambience.paused);
  syncSavedLooks();
  localStorage.setItem('studio316Lang', currentLang);
  closeLanguagePicker();
};

languageToggle.addEventListener('click', event => {
  event.stopPropagation();
  const open = !languagePicker.classList.contains('open');
  languagePicker.classList.toggle('open', open);
  languageToggle.setAttribute('aria-expanded', String(open));
});
languageOptions.forEach(option => option.addEventListener('click', () => applyLanguage(option.dataset.lang)));
addEventListener('click', event => {
  if (!languagePicker.contains(event.target)) closeLanguagePicker();
});
addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLanguagePicker();
});

ambience.volume = .22;
const setSoundState = playing => {
  const meta = languageMeta[currentLang];
  soundToggle.classList.toggle('playing', playing);
  soundToggle.setAttribute('aria-pressed', String(playing));
  soundToggle.setAttribute('aria-label', playing ? meta.stop : meta.play);
  soundLabel.textContent = playing ? meta.pause : meta.sound;
};
soundToggle.addEventListener('click', async () => {
  if (ambience.paused) {
    try {
      await ambience.play();
      localStorage.setItem('studio316Sound', 'on');
    } catch {
      setSoundState(false);
    }
  } else {
    ambience.pause();
    localStorage.setItem('studio316Sound', 'off');
  }
});
ambience.addEventListener('play', () => setSoundState(true));
ambience.addEventListener('pause', () => setSoundState(false));

applyLanguage(localStorage.getItem('studio316Lang') || 'pt');
if (localStorage.getItem('studio316Sound') === 'on') {
  addEventListener('pointerdown', event => {
    if (!soundToggle.contains(event.target)) ambience.play().catch(() => {});
  }, { once: true });
}

const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = max > 0 ? `${(scrollY / max) * 100}%` : '0';
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

toggle.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  const meta = languageMeta[currentLang];
  closeLanguagePicker();
  nav.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? meta.close : meta.menu;
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = languageMeta[currentLang].menu;
}));

if (reduceMotion) {
  document.querySelectorAll('video').forEach(video => video.pause());
} else {
  const videos = document.querySelectorAll('.gallery video, .service-thumb video, .wellbeing video');
  videos.forEach(v => { if (v.dataset.slow) v.playbackRate = parseFloat(v.dataset.slow); });
  const videoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.isIntersecting ? entry.target.play().catch(() => {}) : entry.target.pause();
  }), { threshold: .55 });
  videos.forEach(video => videoObserver.observe(video));
}

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('[data-track]');
  const slides = [...track.children];
  if (slides.length <= 1) { carousel.classList.add('carousel-single'); return; }
  const dotsWrap = carousel.querySelector('[data-dots]');
  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ir para a foto ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });
  let index = 0;
  const setActive = i => {
    index = i;
    dots.forEach((dot, di) => dot.classList.toggle('active', di === i));
  };
  const goTo = i => track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });
  track.addEventListener('scroll', () => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== index) setActive(i);
  }, { passive: true });
  carousel.querySelector('[data-prev]').addEventListener('click', () => goTo((index - 1 + slides.length) % slides.length));
  carousel.querySelector('[data-next]').addEventListener('click', () => goTo((index + 1) % slides.length));
  setActive(0);
  if (!reduceMotion) {
    let timer = setInterval(() => goTo((index + 1) % slides.length), 5000);
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', () => { timer = setInterval(() => goTo((index + 1) % slides.length), 5000); });
  }
});

// campanhas: clicar num cartaz abre-o em grande
(() => {
  const caixa = document.getElementById('lightbox');
  if (!caixa) return;
  const alvo = caixa.querySelector('img');
  document.querySelectorAll('.flyer img, .galeria-foto img').forEach(img => {
    img.closest('.flyer, .galeria-foto').addEventListener('click', () => {
      alvo.src = img.currentSrc || img.src;
      alvo.alt = img.alt;
      caixa.showModal();
    });
  });
  caixa.addEventListener('click', e => { if (e.target === caixa || e.target.hasAttribute('data-close')) caixa.close(); });
})();

// galeria: setas, avanco automatico e clique para ampliar
(() => {
  const rail = document.querySelector('[data-galeria]');
  if (!rail) return;
  const passo = () => {
    const foto = rail.querySelector('.galeria-foto');
    return foto ? foto.getBoundingClientRect().width + 16 : 320;
  };
  document.querySelectorAll('.galeria-seta').forEach(botao => {
    botao.addEventListener('click', () => {
      rail.scrollBy({ left: passo() * Number(botao.dataset.ir) * 2, behavior: 'smooth' });
    });
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let parado = false, aVista = false;
  ['pointerenter', 'focusin', 'pointerdown'].forEach(e => rail.addEventListener(e, () => { parado = true; }));
  ['pointerleave', 'focusout'].forEach(e => rail.addEventListener(e, () => { parado = false; }));
  new IntersectionObserver(([e]) => { aVista = e.isIntersecting; }, { threshold: .2 }).observe(rail);
  setInterval(() => {
    if (parado || !aVista || document.hidden) return;
    const fim = rail.scrollWidth - rail.clientWidth - 4;
    if (rail.scrollLeft >= fim) rail.scrollTo({ left: 0, behavior: 'smooth' });
    else rail.scrollBy({ left: passo(), behavior: 'smooth' });
  }, 3200);
})();
