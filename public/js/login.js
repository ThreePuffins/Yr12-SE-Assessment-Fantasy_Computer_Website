var modal = document.getElementById('login');

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

var loginform = document.getElementById('login-form')

loginform.addEventListener('submit', function(event) {
      const username = loginform.getElementById('username').value;
      const password = loginform.getElementById('psw').value;

      // Validate fields are not empty
      if (!username || !password) {
          alert('All fields are required for login.');
          event.preventDefault();
          return;
      }
});