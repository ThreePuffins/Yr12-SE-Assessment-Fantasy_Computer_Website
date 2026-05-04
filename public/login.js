var modal = document.getElementById('id01');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {

      const username = document.getElementById('username').value;
      const password = document.getElementById('psw').value;

      // Validate fields are not empty
      if (!username || !password || !confirmPassword) {
          alert('All fields are required.');
          event.preventDefault();
          return;
      }
  });