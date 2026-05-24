const input = document.getElementById("searchbar");

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const params = new URLSearchParams(window.location.search);
    params.set('search', input.value);
    window.location.search = params.toString();
  }
});