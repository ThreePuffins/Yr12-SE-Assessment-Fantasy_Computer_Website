const buttons = document.querySelectorAll('.updatebtn');

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const id = (button.id).split('-')[1];
    const description = document.getElementById("game-description-" + id);
    const program = document.getElementById("program-input-" + id);
    const cover = document.getElementById("cover-input-" + id);

    var file = program.files[0];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/auth/update_game", true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("X-File-Name", file.name);
    xhr.setRequestHeader("title", title.value);
    xhr.setRequestHeader("description", description.value);
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('File uploaded successfully');
            window.location.href = `/games`;
        } else {
            alert('File upload failed');
        }
    };
    
    xhr.send(file);
  });
});