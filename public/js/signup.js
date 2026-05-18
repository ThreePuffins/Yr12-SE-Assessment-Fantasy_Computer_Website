var modal = document.getElementById('signup');

window.addEventListener('mousedown', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

var signupform = document.getElementById('signup-form')

signupform.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('psw').value;
    const email = document.getElementById('email').value;
    const confirmPassword = document.getElementById('psw2').value;

    if (!username || !password || !confirmPassword) {
        alert('All fields are required.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (username.length > 10) {
        alert('Username is over 10 characters');
        return;
    }

    fetch('/auth/sign_up_process', { method: 'POST', headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password, email: email}) })
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