document.addEventListener("DOMContentLoaded", () => {
  const setProfileButton = document.querySelector(".primary-button");

  setProfileButton.addEventListener("click", () => {
    // In a real application, this would navigate to the profile setup form
    alert(
      "This would navigate to the profile setup form in a real application."
    );
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
