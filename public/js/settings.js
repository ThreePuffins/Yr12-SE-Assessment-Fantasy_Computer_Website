var modal = document.getElementById('del-acc-overlay');

window.addEventListener('mousedown', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

var pswform = document.getElementById('psw-form')

pswform.addEventListener('submit', function(event) {
    event.preventDefault();
    const old_psw = document.getElementById('old_password').value;
    const new_psw = document.getElementById('new_password').value;
    const conf_psw = document.getElementById('confirm_password').value;

    if (!old_psw || !new_psw || !conf_psw) {
        alert("Fill in all passwords");
        return;
    }

    fetch('/auth/change_password', { method: 'POST', headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({old_psw: old_psw, new_psw: new_psw, conf_psw: conf_psw}) })
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


var accountform = document.getElementById('account-settings-form')

accountform.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username_change').value;
    const email = document.getElementById('email_change').value;

    fetch('/auth/change_account_settings', { method: 'POST', headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, email: email}) })
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
