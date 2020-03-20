if (navigator.share) {
  console.log("Support de l'API de partage")
  document.querySelectorAll('[data-share-url]').forEach(($shareEl) => {
    const $button = document.createElement('button');
    $button.innerHTML = 'Partager';
    $shareEl.parentNode.append($button);

    $button.addEventListener(
      'click',
      shareEvent.bind(this, $shareEl, $button)
    );
  });
} else {
  console.warn("Pas de support")
}

function shareEvent($shareEl, $button) {
  navigator
    .share({
      title: $shareEl.getAttribute('data-share-title'),
      text: $shareEl.getAttribute('data-share-text'),
      url: $shareEl.getAttribute('data-share-url'),
    })
}