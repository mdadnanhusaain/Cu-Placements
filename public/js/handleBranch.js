document.getElementById("branch").addEventListener("change", function () {
  let streamsByBranch = {
    "Bachelor of Engineering": [
      "Computer Science",
      "Mechanical",
      "Electrical",
      "Civil",
    ],
    "Bachelor of Commerce": ["Accounting", "Finance", "Marketing"],
    "Bachelor of Business Administration": [
      "Management",
      "Entrepreneurship",
      "HR",
    ],
    "Bachelor of Science": ["Biology", "Chemistry", "Physics"],
    "Master of Business Administration": [
      "Business Analytics",
      "Supply Chain",
      "Finance",
    ],
    "Master of Technology": [
      "Computer Science",
      "Mechanical Engineering",
      "Electrical Engineering",
    ],
  };

  let selectedBranches = Array.from(this.selectedOptions).map(
    (option) => option.value
  );
  let streamSelect = document.getElementById("stream");

  // Clear existing options
  streamSelect.innerHTML = "";

  // Add a default option
  let defaultOption = document.createElement("option");
  defaultOption.textContent = "---- Select the stream ----";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  streamSelect.appendChild(defaultOption);

  // Set to collect unique streams
  let availableStreams = new Set();

  // Loop through each selected branch and add its streams to the Set
  selectedBranches.forEach(function (branch) {
    if (streamsByBranch[branch]) {
      streamsByBranch[branch].forEach(function (stream) {
        availableStreams.add(stream);
      });
    }
  });

  // Convert the set of streams into dropdown options
  availableStreams.forEach(function (stream) {
    let option = document.createElement("option");
    option.value = stream;
    option.textContent = stream;
    streamSelect.appendChild(option);
  });
});

// Trigger change event to update stream dropdown initially
document.getElementById("branch").dispatchEvent(new Event("change"));
