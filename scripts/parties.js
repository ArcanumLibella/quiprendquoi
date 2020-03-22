if (typeof party !== 'undefined') {
  console.log('PARTY : ', party);
  localStorage.setItem(location.href, party.name);
} else {
  console.log('No party')
}