
const target = document.getElementById('clickable');
target.addEventListener('click', () => {
  fetch('http://localhost:5500/api/hello')
    .then(response => response.json())
    .then(json => console.log(json))
});
