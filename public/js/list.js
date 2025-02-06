function showRenameFolderForm(id, selectedId, name, useRoot) {
  const formContainer = document.getElementById("rename-folder-container");
  const form = document.getElementById("rename-folder-form");
  const input = document.getElementById("rename-input");
  const para = document.getElementById("para");

  input.value = name;
  if (useRoot === "root") {
    input.setAttribute("data-parsley-is-unique", "true");
    input.setAttribute("data-parsley-is-unique-message", "Change folder name.");
  } else {
    input.setAttribute("data-parsley-unique", "true");
    input.setAttribute("data-parsley-unique-message", "Change folder name.");
  }
  form.action = `/folders/${id}/rename/${selectedId}`;
  para.innerHTML = `Rename folder <span class="text-lime-600">'${name}'</span>:`;

  formContainer.classList.remove("hidden");
  formContainer.classList.add("flex");
}

function hideRenameFolderForm() {
  const formContainer = document.getElementById("rename-folder-container");
  formContainer.classList.add("hidden");
  formContainer.classList.remove("flex");
}

function showMoveModal(actionUrl) {
  document.getElementById("moveForm").action = actionUrl;
  const container = document.getElementById("moveModal");
  container.classList.remove("hidden");
  container.classList.add("flex");
}

function hideMoveModal() {
  const container = document.getElementById("moveModal");
  container.classList.remove("flex");
  container.classList.add("hidden");
}

function showDeleteFolderForm(id, selectedId) {
  const formContainer = document.getElementById("delete-folder-container");
  const form = document.getElementById("delete-folder-form");

  form.action = `/folders/${id}/delete/${selectedId}`;

  formContainer.classList.remove("hidden");
  formContainer.classList.add("flex");
}

function hideDeleteFolderForm() {
  const formContainer = document.getElementById("delete-folder-container");
  formContainer.classList.add("hidden");
  formContainer.classList.remove("flex");
}

function showDeleteFileForm(id, selectedId) {
  const formContainer = document.getElementById("delete-file-container");
  const form = document.getElementById("delete-file-form");

  form.action = `/files/${id}/delete/${selectedId}`;

  formContainer.classList.remove("hidden");
  formContainer.classList.add("flex");
}

function hideDeleteFileForm() {
  const formContainer = document.getElementById("delete-file-container");
  formContainer.classList.add("hidden");
  formContainer.classList.remove("flex");
}

const folders = document.querySelectorAll(".folder");
folders.forEach((folder) => {
  const buttonContainer = folder.querySelector(".folder-buttons");

  folder.addEventListener("mouseover", () => {
    buttonContainer.classList.remove("hidden");
    buttonContainer.classList.add("flex");
  });

  folder.addEventListener("mouseout", () => {
    buttonContainer.classList.remove("flex");
    buttonContainer.classList.add("hidden");
  });
});

function copyShareLink() {
  const linkInput = document.getElementById("shareableLink");
  const para = document.getElementById("copy-para");

  linkInput.select();
  linkInput.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard
    .writeText(linkInput.value)
    .then(() => {
      para.textContent = "Copied!";
      para.classList.remove("opacity-0", "invisible");
      para.classList.add("opacity-100", "visible");

      setTimeout(() => {
        para.classList.remove("opacity-100", "visible");
        para.classList.add("opacity-0", "invisible");
      }, 3000); // Show message for 3 seconds
    })
    .catch(() => {
      para.textContent = "Failed to copy!";
      para.classList.remove("opacity-0", "invisible");
      para.classList.add("opacity-100", "visible");

      setTimeout(() => {
        para.classList.remove("opacity-100", "visible");
        para.classList.add("opacity-0", "invisible");
      }, 3000);
    });
}

function showFileShare(url) {
  const container = document.getElementById("share-file-container");
  const input = container.querySelector(".shareable-link");
  input.value = url;

  container.classList.remove("hidden");
  container.classList.add("flex");
}

function hideFileShare() {
  const container = document.getElementById("share-file-container");

  container.classList.remove("flex");
  container.classList.add("hidden");
}
