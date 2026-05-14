var modal = document.getElementById('signup');

window.addEventListener('mousedown', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

var signupform = document.getElementById('signup-form')

signupform.addEventListener('submit', function(event) {
      const username = signupform.getElementById('username').value;
      const password = signupform.getElementById('psw').value;
      const confirmPassword = signupform.getElementById('psw2').value;

      // Validate fields are not empty
      if (!username || !password || !confirmPassword) {
          alert('All fields are required.');
          event.preventDefault();
          return;
      }

      // Validate password length
    //   if (password.length < 8) {
    //       alert('Password must be at least 8 characters long.');
    //       event.preventDefault();
    //       return;
    //   }

      // Validate passwords match
      if (password !== confirmPassword) {
          alert('Passwords do not match.');
          event.preventDefault();
          return;
      }
});