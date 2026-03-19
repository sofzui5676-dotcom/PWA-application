const CACHE_NAME = "smart-dashboard-v1";
const ASSETS_TO_CACHE = ["/", "/index.html", "/offline.html", "/manifest.json", "/src/main.js"];

self.addEventListener("install", e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS_TO_CACHE))));
self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
