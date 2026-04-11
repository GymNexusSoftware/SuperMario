const CACHE_NAME = 'farioli-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './heroi.png',
  './monstro1.png',
  './plataforma.jpg',
  './chao_normal.jpg',
  './chao_neve.jpg',
  './icon.png'
];

// Instalação e Cache dos ficheiros
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// Responde com cache se estiver offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});