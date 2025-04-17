document.addEventListener("DOMContentLoaded", () => {
  const setProfileButton = document.querySelector(".primary-button");

  setProfileButton.addEventListener("click", () => {
    window.location.href = "profile.html";
  });

  // Add hover effect to steps
  const steps = document.querySelectorAll(".step");
  steps.forEach((step) => {
    step.addEventListener("mouseenter", () => {
      if (!step.classList.contains("completed")) {
        step.style.transform = "translateX(5px)";
      }
    });

    step.addEventListener("mouseleave", () => {
      step.style.transform = "translateX(0)";
    });
  });
});
