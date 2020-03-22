if (navigator.serviceWorker) {
  console.log('All good');
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log('Service worker is registered'))
    .catch(err => console.warn(err));
} else {
  console.log('Nothing to see here...');
}

// Installer le service worker à la première visite
addEventListener('install', (event) => {
  console.log('Hello from the service worker')

  // Pour mettre la page en cache
  event.waitUntil(
    caches.open('offline').then((cache) => {
      cache.add('offline.html');
    })
  );
});

addEventListener('fetch', (event) => {
  // console.log(event);
  // event.respondWith(fetch(event.request));
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request).then((res) => {
        if (isPartyPage(event.request.url)) {
          const copy = res.clone();
          caches
            .open('parties')
            .then((cache) => cache.put(event.request, copy));
          return res;
        } else {
          return res;
        }
      })
        .catch(() => caches.match('offline.html')),
    );
  }
  else {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open('static').then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match(event.request)),
    );
  }
});

// Pour savoir si une page est une page évènement
function isPartyPage(url) {
  return /party\/[a-zA-Z0-9]*$/.test(url);
}