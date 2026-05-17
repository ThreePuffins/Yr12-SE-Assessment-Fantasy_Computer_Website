var modal = document.getElementById('login');

window.addEventListener('mousedown', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

var loginform = document.getElementById('login-form')

loginform.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username-inp').value;
    const password = document.getElementById('password-inp').value;

    fetch('/auth/log_in_process', { method: 'POST', headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password}) })
        .then(response => response.json())
        .then(data => {
            if (data.fail) {
                alert(data.message);
            } 
            else {
                window.location.href = data.url;
            }
    });
});

