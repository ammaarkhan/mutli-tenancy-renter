document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map
  const map = L.map("map").setView([43.6532, -79.3832], 13); // Toronto coordinates

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // Sample property coordinates
  const properties = [
    {
      latlng: [43.653, -79.383],
      title: "Room with shared bath and kitchen in Corktown, Toronto.",
      location: "Etobicoke, Toronto",
      price: "C$ 1,200",
    },
    {
      latlng: [43.659, -79.391],
      title: "Bright and Quiet furnished bedroom with private bathroom",
      location: "Etobicoke, Toronto",
      price: "C$ 1,200",
    },
    {
      latlng: [43.645, -79.376],
      title: "Cozy room in downtown Toronto with amenities",
      location: "Downtown, Toronto",
      price: "C$ 1,300",
    },
  ];

  // Add markers for properties
  properties.forEach((property) => {
    const marker = L.marker(property.latlng).addTo(map);

    // Add popup with property info
    marker.bindPopup(`
      <div class="map-popup">
        <h3>${property.title}</h3>
        <div class="map-popup-location">${property.location}</div>
        <div class="map-popup-price">${property.price}</div>
      </div>
    `);

    // Show property card in overlay when marker is clicked
    marker.on("click", () => {
      const mapCard = document.querySelector(".map-card");
      mapCard.querySelector("h3").textContent = property.title;
      mapCard.querySelector(".map-card-location span:last-child").textContent =
        property.location;
      mapCard.querySelector(".map-card-price").textContent = property.price;

      // Show the map overlay
      document.querySelector(".map-overlay").style.display = "block";
    });
  });

  // Map control buttons
  document.querySelector(".zoom-in").addEventListener("click", () => {
    map.zoomIn();
  });

  document.querySelector(".zoom-out").addEventListener("click", () => {
    map.zoomOut();
  });

  document.querySelector(".center-map").addEventListener("click", () => {
    map.setView([43.6532, -79.3832], 13);
  });

  // Filter pills toggle
  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      pill.classList.toggle("active");
    });
  });

  // Favorite buttons
  document.querySelectorAll(".favorite-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      button.textContent = button.textContent === "♡" ? "♥" : "♡";
      button.classList.toggle("favorited");
    });
  });

  // Handle date fields
  const dateInputs = document.querySelectorAll(
    ".date-from input, .date-to input"
  );
  dateInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      // In a real implementation, you would initialize a date picker here
      console.log("Date picker would open here");
    });
  });

  // Swap dates button
  document.querySelector(".swap-dates-btn").addEventListener("click", () => {
    const fromDate = document.querySelector(".date-from input").value;
    const toDate = document.querySelector(".date-to input").value;

    document.querySelector(".date-from input").value = toDate;
    document.querySelector(".date-to input").value = fromDate;
  });

  // Connect profile page to search page
  // This code should be placed in profile.js
  // but we'll include it here for reference
  function setupProfileContinueButton() {
    const continueButton = document.querySelector(".continue-button");
    if (continueButton) {
      continueButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "search.html";
      });
    }
  }

  // In a real implementation, this would be in profile.js
  // setupProfileContinueButton();
});
