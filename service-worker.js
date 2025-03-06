self.addEventListener('fetch', event => {
    event.respondWith(
      fetch(event.request).then(response => {
        const newResponse = new Response(response.body, response);
        newResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
        newResponse.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
        return newResponse;
      })
    );
  });
  
  self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
  });
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }