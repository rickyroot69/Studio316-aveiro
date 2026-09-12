// Comportamento de espaco-aveiro.html. O dicionario de traducoes vive em ../dict.js.

document.getElementById('year').textContent = new Date().getFullYear();
const videos = document.querySelectorAll('video');
videos.forEach(v => { if (v.dataset.slow) v.playbackRate = parseFloat(v.dataset.slow); });
const videoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  entry.isIntersecting ? entry.target.play().catch(() => {}) : entry.target.pause();
}), { threshold: .55 });
videos.forEach(video => videoObserver.observe(video));

const translations = window.STUDIO316_DICT;
const languageIndex = { es: 0, en: 1, de: 2, fr: 3 };
const languageMeta = {
  pt: { html: 'pt-PT', code: 'PT', choose: 'Escolher idioma' },
  es: { html: 'es', code: 'ES', choose: 'Elegir idioma' },
  en: { html: 'en', code: 'EN', choose: 'Choose language' },
  de: { html: 'de', code: 'DE', choose: 'Sprache wählen' },
  fr: { html: 'fr', code: 'FR', choose: 'Choisir la langue' }
};
const languagePicker = document.querySelector('.language-picker');
const languageToggle = languagePicker.querySelector('.language-toggle');
const languageCode = languageToggle.querySelector('span');
const languageOptions = [...languagePicker.querySelectorAll('.language-option')];
const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const parent = node.parentElement;
    return parent && node.nodeValue.trim() && !parent.closest('script, style, [translate="no"], .language-picker')
      ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  }
});
while (walker.nextNode()) textNodes.push(walker.currentNode);
const originalText = new Map(textNodes.map(node => [node, node.nodeValue]));
let currentLang = 'pt';
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
  textNodes.forEach(node => {
    const original = originalText.get(node);
    const key = original.trim();
    const translated = currentLang === 'pt' ? key : translations[key]?.[index];
    node.nodeValue = translated ? original.replace(key, translated) : original;
  });
  languageOptions.forEach(option => option.classList.toggle('active', option.dataset.lang === currentLang));
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
document.addEventListener('click', event => { if (!languagePicker.contains(event.target)) closeLanguagePicker(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLanguagePicker(); });
applyLanguage(localStorage.getItem('studio316Lang') || 'pt');
