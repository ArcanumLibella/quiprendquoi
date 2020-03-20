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
  event.respondWith(
    fetch(event.request)
      .then((res) => {
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
      .catch(() => {
        if (isPartyPage(event.request.url)) {
          return caches
            .match(event.request)
            .catch((err) => caches.match('offline.html'));
        } else {
          return caches.match('offline.html');
        }
      }));
});

// Pour savoir si une page est une page évènement
function isPartyPage(url) {
  return /party\/[a-zA-Z0-9]*$/.test(url);
}