// Chat functionality
document.addEventListener("DOMContentLoaded", function () {
  const chatInput = document.querySelector(".input-wrapper input");
  const sendButton = document.querySelector(".send-btn");
  const chatMessages = document.querySelector(".chat-messages");
  const emojiButton = document.querySelector(".emoji-btn");
  const attachmentButton = document.querySelector(".attachment-btn");

  // Modal elements
  const addParticipantBtn = document.querySelector(
    'button[title="Add participant"]'
  );
  const modal = document.getElementById("inviteModal");
  const closeModalBtn = document.querySelector(".close-modal");
  const inviteForm = document.getElementById("inviteForm");

  // Remove participant functionality
  document.querySelectorAll(".remove-participant").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const participant = this.closest(".participant");
      const participantName =
        participant.querySelector(".participant-name").textContent;

      if (
        confirm(
          `Are you sure you want to remove ${participantName} from the application?`
        )
      ) {
        // Here you would typically make an API call to remove the participant
        participant.style.opacity = "0";
        setTimeout(() => {
          participant.remove();
          // Update the participants count
          const participantsCount = document.querySelector(
            ".participants-count"
          );
          const currentCount = parseInt(participantsCount.textContent);
          participantsCount.textContent = `${currentCount - 1} participants`;
          // Send a message in chat
          sendMessage(
            `${participantName} has been removed from the application.`
          );
        }, 200);
      }
    });
  });

  // Send message function
  function sendMessage(message) {
    if (!message.trim()) return;

    const messageHTML = `
      <div class="message sent">
        <div class="message-content">
          <p>${message}</p>
          <span class="message-time">${new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}</span>
        </div>
      </div>
    `;

    chatMessages.insertAdjacentHTML("beforeend", messageHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = "";
  }

  // Modal functions
  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
    inviteForm.reset();
  }

  // Event listeners for chat
  sendButton.addEventListener("click", () => {
    sendMessage(chatInput.value);
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(chatInput.value);
    }
  });

  // Event listeners for modal
  addParticipantBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle invite form submission
  inviteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("inviteEmail").value;

    // Here you would typically send the invitation to your backend
    console.log(`Invitation sent to: ${email}`);

    // Show success message in chat
    sendMessage(`Invitation sent to ${email}`);

    // Close the modal
    closeModal();
  });

  // Placeholder functions for other buttons
  emojiButton.addEventListener("click", () => {
    alert("Emoji picker coming soon!");
  });

  attachmentButton.addEventListener("click", () => {
    alert("Attachment feature coming soon!");
  });

  // Auto-scroll to bottom of messages
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
