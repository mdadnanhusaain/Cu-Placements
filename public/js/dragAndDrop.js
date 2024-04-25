let dropArea = document.getElementById("dropArea");
let inputFile = document.getElementById("resume");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
});
