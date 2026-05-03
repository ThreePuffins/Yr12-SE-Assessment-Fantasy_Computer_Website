
const target = document.getElementById('clickable');
target.addEventListener('click', () => {
  fetch('http://localhost:8080/api/hello')
    .then(response => response.json())
    .then(json => console.log(json))
});
