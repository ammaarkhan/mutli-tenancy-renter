// Chat functionality
document.addEventListener("DOMContentLoaded", function () {
  const chatInput = document.querySelector(".input-wrapper input");
  const sendButton = document.querySelector(".send-btn");
  const chatMessages = document.querySelector(".chat-messages");
  const emojiButton = document.querySelector(".emoji-btn");
  const attachmentButton = document.querySelector(".attachment-btn");

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

  // Event listeners
  sendButton.addEventListener("click", () => {
    sendMessage(chatInput.value);
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(chatInput.value);
    }
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
