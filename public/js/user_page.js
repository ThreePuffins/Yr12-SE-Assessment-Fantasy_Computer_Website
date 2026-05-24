const buttons = document.querySelectorAll('.updatebtn');

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const id = (button.id).split('-')[1];
    const description = document.getElementById("game-description-" + id);
    const title = document.getElementById("title-input-" + id);
    const program = document.getElementById("program-input-" + id);
    const cover = document.getElementById("cover-input-" + id);

    
    if (cover.files[0] && program.files[0]) {
        window.alert('Cannot upload multiple files at once.');
        return;
    }
    var type = null;
    var file = null;
    if (cover.files[0]) {file = cover.files[0]; type = "cover";}
    if (program.files[0]) {file = program.files[0]; type = "program";}
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/auth/update_game", true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("X-File-Name", file ? file.name : null);
    xhr.setRequestHeader("game-id", id);
    xhr.setRequestHeader("title", title.value);
    xhr.setRequestHeader("type", type);
    xhr.setRequestHeader("description", description.value);
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            window.location.reload();
        } else {
            alert('Update failed');
        }
    };
    
    xhr.send(file);
  });
});