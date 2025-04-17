document.addEventListener("DOMContentLoaded", () => {
  // Option selection handlers
  const optionItems = document.querySelectorAll(".option-item");

  optionItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Toggle selected state for all options
      item.classList.toggle("selected");
    });
  });

  // Number input handlers
  const adultsInput = document.getElementById("adults-count");
  const inviteSection = document.querySelector(".invite-section");

  // Initialize invite section based on initial value
  updateInviteSection(parseInt(adultsInput.value));

  // Handle adults count changes
  document
    .querySelector(".number-control .minus")
    .addEventListener("click", () => {
      const currentValue = parseInt(adultsInput.value);
      if (currentValue > parseInt(adultsInput.min)) {
        adultsInput.value = currentValue - 1;
        updateInviteSection(currentValue - 1);
      }
    });

  document
    .querySelector(".number-control .plus")
    .addEventListener("click", () => {
      const currentValue = parseInt(adultsInput.value);
      adultsInput.value = currentValue + 1;
      updateInviteSection(currentValue + 1);
    });

  // Handle manual input change
  adultsInput.addEventListener("change", () => {
    updateInviteSection(parseInt(adultsInput.value));
  });

  function updateInviteSection(adultCount) {
    console.log("Updating invite section for", adultCount, "adults");
    if (adultCount > 1) {
      inviteSection.style.display = "block";
      const inviteList = document.querySelector(".invite-list");
      const currentInvites =
        inviteList.querySelectorAll(".invite-entry").length;
      const neededInvites = adultCount - 1;

      if (currentInvites < neededInvites) {
        // Add needed invite inputs
        for (let i = currentInvites; i < neededInvites; i++) {
          addInviteEntry();
        }
      } else if (currentInvites > neededInvites) {
        // Remove extra invite inputs
        for (let i = currentInvites; i > neededInvites; i--) {
          const lastInvite = inviteList.querySelector(
            ".invite-entry:last-child"
          );
          if (lastInvite) {
            lastInvite.remove();
          }
        }
      }
    } else {
      inviteSection.style.display = "none";
    }
  }

  // Add invite button handler
  const addInviteButton = document.querySelector(".add-invite-button");
  if (addInviteButton) {
    addInviteButton.addEventListener("click", () => addInviteEntry());
  }

  function addInviteEntry() {
    const inviteList = document.querySelector(".invite-list");
    const entry = document.createElement("div");
    entry.className = "invite-entry";

    const input = document.createElement("input");
    input.type = "email";
    input.className = "invite-input";
    input.placeholder = "Enter email address";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-invite";
    removeButton.innerHTML = "×";
    removeButton.addEventListener("click", () => {
      entry.remove();
      // Add a new empty invite entry if there are none left
      if (inviteList.children.length === 0) {
        addInviteEntry();
      }
    });

    const status = document.createElement("div");
    status.className = "invite-status";

    entry.appendChild(input);
    entry.appendChild(removeButton);
    entry.appendChild(status);
    inviteList.appendChild(entry);

    // Handle email input changes
    input.addEventListener("change", () => {
      if (input.value) {
        if (isValidEmail(input.value)) {
          status.className = "invite-status sent";
          status.textContent = "Invite sent!";
          // Here you would typically make an API call to send the invite
        } else {
          status.className = "invite-status error";
          status.textContent = "Invalid email";
        }
      } else {
        status.textContent = "";
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Handle other number inputs
  const otherNumberControls = document.querySelectorAll(
    ".number-control:not(:has(#adults-count))"
  );
  otherNumberControls.forEach((control) => {
    const input = control.querySelector(".number-input");
    const minusBtn = control.querySelector(".minus");
    const plusBtn = control.querySelector(".plus");

    minusBtn.addEventListener("click", () => {
      const currentValue = parseInt(input.value);
      if (currentValue > parseInt(input.min)) {
        input.value = currentValue - 1;
      }
    });

    plusBtn.addEventListener("click", () => {
      const currentValue = parseInt(input.value);
      input.value = currentValue + 1;
    });
  });

  // File upload handler
  const uploadArea = document.querySelector(".upload-area");

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "var(--primary-color)";
    uploadArea.style.backgroundColor = "#f8fafc";
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.style.borderColor = "#e2e8f0";
    uploadArea.style.backgroundColor = "white";
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "#e2e8f0";
    uploadArea.style.backgroundColor = "white";

    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  uploadArea.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/jpg";
    input.multiple = true;
    input.style.display = "none";

    input.addEventListener("change", (e) => {
      handleFiles(e.target.files);
    });

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  });

  function handleFiles(files) {
    // Here you would typically handle file upload
    // For this prototype, we'll just show an alert
    alert(`Selected ${files.length} file(s)`);
  }

  // Form navigation
  const backButton = document.querySelector(".back-button");
  const continueButton = document.querySelector(".continue-button");

  backButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  continueButton.addEventListener("click", (e) => {
    e.preventDefault();
    // Here you would typically handle form submission
    alert("Form would be submitted here");
  });

  // Invite Section Functionality
  const inviteList = document.querySelector(".invite-list");
  const pendingInvitesList = document.querySelector(".pending-invites-list");

  // Show invite section when "With a family/friends" is selected
  const familyFriendsOption = document.querySelector(
    ".moving-with-options .option-item:nth-child(2)"
  );
  familyFriendsOption?.addEventListener("click", () => {
    inviteSection.style.display = "block";
  });

  // Create a new invite entry
  function createInviteEntry() {
    const entry = document.createElement("div");
    entry.className = "invite-entry";
    entry.innerHTML = `
      <input 
        type="email" 
        class="invite-input" 
        placeholder="Enter roommate's email"
        aria-label="Roommate email address"
      />
      <button type="button" class="send-invite-button" disabled>
        Send Invite
      </button>
      <button type="button" class="remove-invite" title="Remove">
        ×
      </button>
    `;

    // Add event listeners for this entry
    setupInviteEntryListeners(entry);
    return entry;
  }

  // Setup listeners for an invite entry
  function setupInviteEntryListeners(entry) {
    const input = entry.querySelector(".invite-input");
    const sendButton = entry.querySelector(".send-invite-button");
    const removeButton = entry.querySelector(".remove-invite");

    // Email validation and send button toggle
    input.addEventListener("input", () => {
      const isValidEmail = validateEmail(input.value);
      sendButton.disabled = !isValidEmail;
    });

    // Send invite
    sendButton.addEventListener("click", () => {
      if (validateEmail(input.value)) {
        const email = input.value;

        // Convert the entry to a sent state
        entry.innerHTML = `
          <div class="sent-invite">
            <span class="sent-email">${email}</span>
            <span class="sent-status">Sent</span>
          </div>
          <button type="button" class="remove-invite" title="Remove">
            ×
          </button>
        `;

        // Reattach remove button listener
        entry.querySelector(".remove-invite").addEventListener("click", () => {
          entry.remove();
        });

        // Here you would typically make an API call to send the invite
        console.log(`Invite sent to: ${email}`);
      }
    });

    // Remove invite entry
    removeButton.addEventListener("click", () => {
      entry.remove();
    });
  }

  // Email validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Add new invite entry when clicking "Add another roommate"
  if (addInviteButton) {
    // Remove any existing click listeners
    const newAddInviteButton = addInviteButton.cloneNode(true);
    addInviteButton.parentNode.replaceChild(
      newAddInviteButton,
      addInviteButton
    );

    newAddInviteButton.addEventListener("click", () => {
      const newEntry = createInviteEntry();
      inviteList.appendChild(newEntry);
    });
  }

  // Initialize with one invite entry if needed
  if (inviteList && inviteList.children.length === 0) {
    inviteList.appendChild(createInviteEntry());
  }
});
