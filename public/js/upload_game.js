const upload = document.getElementById('upload-game');
const title = document.getElementById('game-title');
const description = document.getElementById('game-description');

upload.addEventListener('mousedown', (event) => {
    const fileInput = document.getElementById('program-input');
    if (!title.value || !fileInput.files || !description.value) {
        window.alert('All fields are required.');
        return;
    }
    const file = fileInput.files[0];

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