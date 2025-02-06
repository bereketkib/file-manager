function showCreateFolderForm() {
  const formContainer = document.getElementById("create-folder-container");
  formContainer.classList.remove("hidden");
  formContainer.classList.add("flex");
}

function hideCreateFolderForm() {
  const formContainer = document.getElementById("create-folder-container");
  const input = formContainer.querySelector(".name");
  const error = formContainer.querySelector(".parsley-errors-list");

  if (error) {
    error.classList.remove("filled");
  }
  input.value = "";
  formContainer.classList.add("hidden");
  formContainer.classList.remove("flex");
}

document.querySelectorAll(".folder-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });

  link.addEventListener("dblclick", function () {
    window.location.href = this.href;
  });
});

function showUploadFileForm() {
  const container = document.getElementById("upload-file-container");

  container.classList.remove("hidden");
  container.classList.add("flex");
}

function hideUploadFileForm() {
  const container = document.getElementById("upload-file-container");

  container.classList.remove("flex");
  container.classList.add("hidden");
}

document.getElementById("file-upload").addEventListener("change", function () {
  const fileName = this.files[0]
    ? this.files[0].name
    : "Click to choose a file";
  document.getElementById("file-name").textContent = fileName;
});

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + " B"; // Bytes
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(0) + " KB"; // KB (rounded)
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"; // MB (2 decimal places)
  }
}

function showFileInfo(id, name, size, date, folderId, url) {
  const container = document.querySelector(".file-info");
  const nameElement = container.querySelector(".name");
  const sizeElement = container.querySelector(".size");
  const dateElement = container.querySelector(".date");
  const deleteButton = container.querySelector(".delete-file-button");
  const moveButton = container.querySelector(".move-file-button");
  const shareButton = container.querySelector(".share-file-button");

  shareButton.addEventListener("click", () => {
    showFileShare(url);
  });

  deleteButton.addEventListener("click", () => {
    showDeleteFileForm(id, folderId);
  });

  moveButton.addEventListener("click", () => {
    showMoveModal(`/files/${id}/move/${folderId}`);
  });

  const timeStamp = new Date(date);
  const readableDate = timeStamp.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  dateElement.innerHTML = `<span class="text-gray-200">Uploaded:</span> ${readableDate}`;
  nameElement.textContent = name;
  sizeElement.innerHTML = `<span class="text-gray-200">Size:</span> ${formatFileSize(
    size
  )}`;

  container.classList.remove("hidden");
  container.classList.add("flex");
}

function hideFileInfo() {
  const container = document.querySelector(".file-info");

  container.classList.remove("flex");
  container.classList.add("hidden");
}
