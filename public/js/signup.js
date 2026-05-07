var modal = document.getElementById('id01');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('signupForm').addEventListener('submit', function(event) {

      const username = document.getElementById('username').value;
      const password = document.getElementById('psw').value;
      const confirmPassword = document.getElementById('psw2').value;

      // Validate fields are not empty
      if (!username || !password || !confirmPassword) {
          alert('All fields are required.');
          event.preventDefault();
          return;
      }

      // Validate password length
      if (password.length < 8) {
          alert('Password must be at least 8 characters long.');
          event.preventDefault();
          return;
      }

      // Validate passwords match
      if (password !== confirmPassword) {
          alert('Passwords do not match.');
          event.preventDefault();
          return;
      }
  });