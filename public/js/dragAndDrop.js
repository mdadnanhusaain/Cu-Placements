let dropArea = document.getElementById("dropArea");
let inputFile = document.getElementById("resume");
// let dropMessage = document.getElementById("drop-message");
// let dropText = document.getElementById("drop-text");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
});
