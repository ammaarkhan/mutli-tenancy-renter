// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Application initialized");

  // Initialize any necessary variables or state
  const state = {
    // Add state variables as needed
  };

  // Initialize gallery functionality
  const mainImage = document.querySelector(".main-image img");
  const thumbnails = document.querySelectorAll(".thumbnail-grid img");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Swap main image with thumbnail
      const mainSrc = mainImage.src;
      mainImage.src = thumbnail.src;
      thumbnail.src = mainSrc;
    });
  });

  // Initialize date inputs with today's date
  const moveInDate = document.querySelector(".date-field input:first-of-type");
  const moveOutDate = document.querySelector(".date-field input:last-of-type");

  const today = new Date();
  const nextMonth = new Date(today.setMonth(today.getMonth() + 1));

  moveInDate.valueAsDate = new Date();
  moveOutDate.valueAsDate = nextMonth;

  // Co-applicants Management
  const addApplicantBtn = document.querySelector(".add-applicant");
  const coApplicantSlots = document.querySelector(".co-applicant-slots");
  let coApplicantCount = 0;
  const MAX_APPLICANTS = 3; // Maximum number of co-applicants allowed

  function createCoApplicant(email) {
    const applicant = document.createElement("div");
    applicant.className = "applicant";
    applicant.innerHTML = `
      <div class="applicant-placeholder">
        <i class="fas fa-user-circle"></i>
      </div>
      <div class="applicant-info">
        <span class="applicant-name">${email}</span>
        <span class="applicant-status pending">Invitation sent</span>
      </div>
      <button class="remove-applicant" aria-label="Remove co-applicant">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Add remove functionality
    const removeBtn = applicant.querySelector(".remove-applicant");
    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      applicant.remove();
      coApplicantCount--;
      updateAddApplicantButton();
    });

    return applicant;
  }

  function updateAddApplicantButton() {
    addApplicantBtn.style.display =
      coApplicantCount >= MAX_APPLICANTS ? "none" : "flex";
  }

  function showInviteModal() {
    // Create modal element
    const modal = document.createElement("div");
    modal.className = "invite-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Invite Co-applicant</h3>
        <p>Enter your friend's email to send them an invitation</p>
        <form id="inviteForm">
          <input type="email" placeholder="friend@email.com" required>
          <div class="modal-buttons">
            <button type="button" class="cancel-btn">Cancel</button>
            <button type="submit" class="send-btn">Send Invitation</button>
          </div>
        </form>
      </div>
    `;

    // Add modal styles dynamically
    const style = document.createElement("style");
    style.textContent = `
      .invite-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        width: 90%;
        max-width: 400px;
      }
      .modal-content h3 {
        margin-bottom: 1rem;
        color: #2c3e50;
      }
      .modal-content p {
        color: #666;
        margin-bottom: 1.5rem;
      }
      .modal-content input {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #e1e1e1;
        border-radius: 6px;
        margin-bottom: 1rem;
      }
      .modal-buttons {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
      }
      .cancel-btn, .send-btn {
        padding: 0.8rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
      }
      .cancel-btn {
        background: #f8f9fa;
        border: 1px solid #e1e1e1;
      }
      .send-btn {
        background: #2c3e50;
        color: white;
        border: none;
      }
    `;
    document.head.appendChild(style);

    // Add modal to body
    document.body.appendChild(modal);

    // Handle form submission
    const form = modal.querySelector("#inviteForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input").value;

      // Add co-applicant to the list
      const newApplicant = createCoApplicant(email);
      coApplicantSlots.insertBefore(newApplicant, addApplicantBtn);
      coApplicantCount++;
      updateAddApplicantButton();

      // Remove modal
      modal.remove();
    });

    // Handle cancel button
    const cancelBtn = modal.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", () => modal.remove());

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  // Add co-applicant button click handler
  addApplicantBtn.addEventListener("click", showInviteModal);

  // Update check availability button text based on co-applicants
  const checkAvailabilityBtn = document.querySelector(".check-availability");
  const originalButtonText = checkAvailabilityBtn.textContent;

  function updateCheckAvailabilityButton() {
    checkAvailabilityBtn.textContent =
      coApplicantCount > 0
        ? `Check availability for ${coApplicantCount + 1} people`
        : originalButtonText;
  }

  // Handle check availability button
  checkAvailabilityBtn.addEventListener("click", () => {
    // In a real application, this would make an API call
    const message =
      coApplicantCount > 0
        ? `Your group application with ${coApplicantCount} co-applicant${
            coApplicantCount > 1 ? "s" : ""
          } has been sent!`
        : "Your inquiry has been sent to the host!";
    alert(message);
  });

  // Handle navigation highlighting
  const navLinks = document.querySelectorAll(".property-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Simple responsive navigation for mobile
  const logo = document.querySelector(".logo");
  const navControls = document.querySelector(".nav-controls");

  // Add smooth scrolling to navigation items
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
