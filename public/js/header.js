var modal = document.getElementById('acc-o');

window.addEventListener('mousedown', (event) => {
    if (!modal.contains(event.target)) {
        modal.style.display = "none";
    }
});
