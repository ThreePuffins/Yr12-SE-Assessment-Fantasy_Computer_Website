var upload = document.getElementById('upload-game');

upload.addEventListener('mousedown', (event) => {
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload_game", true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("X-File-Name", file.name);
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('File uploaded successfully');
        } else {
            alert('File upload failed');
        }
    };
    
    xhr.send(file);
});