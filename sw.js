// AI Study Hub · 서비스워커 (홈 화면 추가 / 오프라인 셸)
const CACHE = 'ai-study-hub-v1';
const ASSETS = [
  './', './index.html', './subject.html', './exam.html', './review.html', './result.html',
  './css/base.css', './css/theme-bento.css', './css/theme-dark.css',
  './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 외부 도메인(Firestore/Firebase 실시간 데이터, CDN)은 가로채지 않고 네트워크 그대로
  if (url.origin !== location.origin) return;
  // 같은 출처: 네트워크 우선, 실패 시 캐시(오프라인) 폴백
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
  );
});
