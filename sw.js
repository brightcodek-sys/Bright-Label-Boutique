// sw.js - The "Safe" Version
self.addEventListener('fetch', (event) => {
    // If the request is for Firebase (Google), let it pass through without touching it
    if (event.request.url.includes('googleapis') || event.request.url.includes('firebase')) {
        return; 
    }

    event.respondWith(
        fetch(event.request).catch(() => {
            // If offline, try to find it in the cache
            return caches.match(event.request);
        })
    );
});