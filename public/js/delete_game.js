var modal = document.getElementById('del-acc-overlay');

window.addEventListener('mousedown', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

var recent_id = null

const buttons = document.querySelectorAll('.deletebtn');

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    recent_id = (button.id).split('-')[1];
  });
});

var deleteform = document.getElementById('delete-account-form')

deleteform.addEventListener('submit', function(event) {
    event.preventDefault();
    fetch('/auth/delete_game', { method: 'POST', headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({id: recent_id}) })
        .then(response => response.json())
        .then(window.location.reload());
});