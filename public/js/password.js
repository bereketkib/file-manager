document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  const eyeIcon = togglePassword.querySelector("i");

  togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  });

  if (document.getElementById("confirm-password")) {
    const confirmPasswordInput = document.getElementById("confirm-password");
    const toggleConfirmPassword = document.getElementById(
      "toggleConfirmPassword"
    );

    const eyeIcon2 = toggleConfirmPassword.querySelector("i");

    toggleConfirmPassword.addEventListener("click", function () {
      if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        eyeIcon2.classList.remove("fa-eye");
        eyeIcon2.classList.add("fa-eye-slash");
      } else {
        confirmPasswordInput.type = "password";
        eyeIcon2.classList.remove("fa-eye-slash");
        eyeIcon2.classList.add("fa-eye");
      }
    });
  }
});
