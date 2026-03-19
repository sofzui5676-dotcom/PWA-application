const CACHE_NAME = "smart-dashboard-v1";

const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/offline.html",
    "/manifest.json",
    "/src/main.js",
    "/src/serviceWorker.js",
    "/src/styles/reset.css",
    "/src/styles/variables.css",
    "/src/styles/main.css",
    "/src/core/router.js",
    "/src/core/uiContainer.js"
];

self.addEventListener("install", event => {
    console.log("📦 Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching assets...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener("activate", event => {
    console.log("⚡ Service Worker activating...");
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log("Deleting old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }
            
            return fetch(event.request).catch(() => {
                if (event.request.mode === "navigate") {
                    return caches.match("/offline.html");
                }
            });
        })
    );
});
