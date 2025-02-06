function toggleProfileMenu() {
  const menu = document.getElementById("profile-menu");
  if (menu.classList.contains("opacity-0")) {
    menu.classList.remove("opacity-0", "scale-80", "pointer-events-none");
    menu.classList.add("opacity-100", "scale-100");
  } else {
    menu.classList.remove("opacity-100", "scale-100");
    menu.classList.add("opacity-0", "scale-80", "pointer-events-none");
  }
}

document.addEventListener("click", function (event) {
  const menu = document.getElementById("profile-menu");
  const button = document.getElementById("profile-toggler");

  if (!menu.contains(event.target) && !button.contains(event.target)) {
    menu.classList.remove("opacity-100", "scale-100");
    menu.classList.add("opacity-0", "scale-80", "pointer-events-none");
  }
});

function showConfirmDialog() {
  const dialog = document.getElementById("confirm-dialog");
  toggleProfileMenu();
  dialog.classList.remove("hidden");
  dialog.classList.add("flex");
}

function hideConfirmDialog() {
  const dialog = document.getElementById("confirm-dialog");
  dialog.classList.remove("flex");
  dialog.classList.add("hidden");
}
