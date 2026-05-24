var upload = document.getElementById('upload-game');
var title = document.getElementById('game-title');
var description = document.getElementById('game-description');

upload.addEventListener('mousedown', (event) => {
    var fileInput = document.getElementById('program-input');
    if (!title.value || !fileInput.files || !description.value) {
        alert('All (non-optional) fields are required.');
        return;
    }
    var file = fileInput.files[0];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/auth/upload_game", true);
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