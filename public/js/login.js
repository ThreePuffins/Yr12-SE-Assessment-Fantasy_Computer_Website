var modal = document.getElementById('login');

window.addEventListener('mousedown', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

var loginform = document.getElementById('login-form')

loginform.addEventListener('submit', function(event) {
      const username = loginform.getElementById('username').value;
      const password = loginform.getElementById('psw').value;

      if (!username || !password) {
          alert('All fields are required for login.');
          event.preventDefault();
          return;
      }
});