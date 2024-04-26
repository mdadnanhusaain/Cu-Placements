const dropAreas = document.querySelectorAll(".dropArea");

dropAreas.forEach((dropArea) => {
  dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("dragover");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
  });

  dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("dragover");

    const file = event.dataTransfer.files[0];
    const fileType = dropArea.querySelector("input").accept;

    if (fileType === "image/*" && !file.type.startsWith("image/")) {
      alert("Please select only image files.");
      return;
    }

    if (fileType === "application/pdf" && file.type !== "application/pdf") {
      alert("Please select only PDF files.");
      return;
    }

    const input = dropArea.querySelector("input");
    input.files = event.dataTransfer.files;

    handleFiles(input);
  });

  dropArea.querySelector("input").addEventListener("change", (event) => {
    handleFiles(event.target);
  });
});

function handleFiles(input) {
  const file = input.files[0];
  console.log("File selected:", file.name);
  // You can perform further operations with the selected file here
}
