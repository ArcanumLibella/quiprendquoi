if (navigator.clipboard) {
  console.log("Support du presse papier")
  document.querySelectorAll('[data-clipboard]').forEach(($clipboardEl) => {
    const $button = document.createElement('button');
    $button.innerHTML = 'Copier';
    $clipboardEl.parentNode.append($button);

    $button.addEventListener(
      'click',
      copyToClipboard.bind(this, $clipboardEl, $button)
    );
  });
} else {
  console.warn("Pas de support")
}

function copyToClipboard($clipboardEl, $button) {
  navigator.clipboard
    .writeText($clipboardEl.getAttribute('data-clipboard'))
    .then(() => {
      console.log('Copié !');
      $button.innerHTML = 'Copié !';
      setTimeout(() => ($button.innerHTML = 'Copier'), 2000);

    })
    .catch((err) => console.warn(err));
}