document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const alerts = document.querySelectorAll('[role="alert"]');
    alerts.forEach((alert) => {
      alert.style.display = "none";
    });
  }, 5000);
});
