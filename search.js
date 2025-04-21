document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");

  // Add click handler using event delegation
  document.addEventListener("click", function (e) {
    const card = e.target.closest(".listing-card");
    if (card) {
      console.log("Card clicked through delegation!");
      window.location.href = "listing.html?id=1";
    }
  });

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
      id: "1",
      latlng: [43.653, -79.383],
      title: "Room with shared bath and kitchen in Corktown, Toronto.",
      location: "Etobicoke, Toronto",
      price: "C$ 1,200",
      rooms: 1,
      type: "shared",
    },
    {
      id: "2",
      latlng: [43.659, -79.391],
      title: "Bright and Quiet furnished bedroom with private bathroom",
      location: "Etobicoke, Toronto",
      price: "C$ 1,200",
      rooms: 2,
      type: "entire",
    },
    {
      id: "3",
      latlng: [43.645, -79.376],
      title: "Cozy room in downtown Toronto with amenities",
      location: "Downtown, Toronto",
      price: "C$ 1,300",
      rooms: 3,
      type: "shared",
    },
  ];

  // Add markers for properties
  let markers = [];
  function addMarkers(filteredProperties = properties) {
    // Clear existing markers
    markers.forEach((marker) => map.removeLayer(marker));
    markers = [];

    // Add new markers
    filteredProperties.forEach((property) => {
      const marker = L.marker(property.latlng).addTo(map);
      markers.push(marker);

      // Add popup with property info
      marker.bindPopup(`
        <div class="map-popup">
          <h3>${property.title}</h3>
          <div class="map-popup-location">${property.location}</div>
          <div class="map-popup-price">${property.price}</div>
          <a href="listing.html?id=${property.id}" class="view-listing-btn">View Listing</a>
        </div>
      `);

      // Show property card in overlay when marker is clicked
      marker.on("click", () => {
        const mapCard = document.querySelector(".map-card");
        mapCard.querySelector("h3").textContent = property.title;
        mapCard.querySelector(
          ".map-card-location span:last-child"
        ).textContent = property.location;
        mapCard.querySelector(".map-card-price").textContent = property.price;

        // Add view listing button to map card
        const viewListingBtn =
          mapCard.querySelector(".view-listing-btn") ||
          document.createElement("a");
        viewListingBtn.href = `listing.html?id=${property.id}`;
        viewListingBtn.className = "view-listing-btn";
        viewListingBtn.textContent = "View Listing";
        if (!mapCard.querySelector(".view-listing-btn")) {
          mapCard.appendChild(viewListingBtn);
        }

        // Show the map overlay
        document.querySelector(".map-overlay").style.display = "block";
      });
    });
  }

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

  // Filter functionality
  const houseTypeFilterContainer = document.getElementById(
    "house-type-filter-container"
  );
  const houseTypeFilterButton = document.getElementById(
    "house-type-filter-button"
  );
  const roomsFilterContainer = document.getElementById(
    "rooms-filter-container"
  );
  const roomsFilterButton = document.getElementById("rooms-filter-button");

  let selectedHouseTypes = [];
  let selectedRooms = [];

  function filterProperties() {
    let filteredProperties = properties;

    // Apply house type filter
    if (selectedHouseTypes.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        selectedHouseTypes.includes(property.type)
      );
    }

    // Apply rooms filter
    if (selectedRooms.length > 0) {
      filteredProperties = filteredProperties.filter((property) => {
        // Handle 4+ rooms case
        if (selectedRooms.includes("4plus")) {
          return (
            property.rooms >= 4 ||
            selectedRooms.includes(property.rooms.toString())
          );
        }
        return selectedRooms.includes(property.rooms.toString());
      });
    }

    // Update markers on the map
    addMarkers(filteredProperties);

    // Update listings count
    const listingsCount = document.querySelector(".listings-count");
    if (listingsCount) {
      listingsCount.textContent = `Showing ${filteredProperties.length} rooms`;
    }
  }

  if (houseTypeFilterContainer) {
    // Initialize checkbox event listeners
    const houseTypeCheckboxes = houseTypeFilterContainer.querySelectorAll(
      'input[type="checkbox"]'
    );
    houseTypeCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      checkbox.addEventListener("change", () => {
        selectedHouseTypes = Array.from(houseTypeCheckboxes)
          .filter((cb) => cb.checked)
          .map((cb) => cb.value);
        filterProperties();
      });
    });
  }

  if (roomsFilterContainer) {
    // Initialize checkbox event listeners for rooms
    const roomsCheckboxes = roomsFilterContainer.querySelectorAll(
      'input[type="checkbox"]'
    );
    roomsCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      checkbox.addEventListener("change", () => {
        selectedRooms = Array.from(roomsCheckboxes)
          .filter((cb) => cb.checked)
          .map((cb) => cb.value);
        filterProperties();
      });
    });
  }

  // Handle filter button click
  houseTypeFilterButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Close any other open dropdowns
    document
      .querySelectorAll(".filter-pill-container.active")
      .forEach((container) => {
        if (container !== houseTypeFilterContainer) {
          container.classList.remove("active");
        }
      });

    // Toggle this dropdown
    houseTypeFilterContainer.classList.toggle("active");
  });

  // Handle clicks on the dropdown menu to prevent closing
  houseTypeFilterContainer
    .querySelector(".dropdown-menu")
    .addEventListener("click", (e) => {
      e.stopPropagation();
    });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-pill-container")) {
      document
        .querySelectorAll(".filter-pill-container.active")
        .forEach((container) => {
          container.classList.remove("active");
        });
    }
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
      console.log("Date picker would open here");
    });
  });

  // Swap dates button
  const swapDatesBtn = document.querySelector(".swap-dates-btn");
  if (swapDatesBtn) {
    swapDatesBtn.addEventListener("click", () => {
      const fromDate = document.querySelector(".date-from input").value;
      const toDate = document.querySelector(".date-to input").value;

      document.querySelector(".date-from input").value = toDate;
      document.querySelector(".date-to input").value = fromDate;
    });
  }

  // Initialize markers
  addMarkers();

  console.log("Setting up click handlers...");
  const cards = document.querySelectorAll(".listing-card");
  console.log("Found listing cards:", cards.length);

  // Add click handlers to all listing cards
  cards.forEach((card, index) => {
    console.log("Adding click handler to card", index);
    card.style.cursor = "pointer";
    card.onclick = function (e) {
      console.log("Card clicked!", index);
      // Don't navigate if clicking the favorite button
      if (e.target.closest(".favorite-button")) {
        console.log("Favorite button clicked, not navigating");
        return;
      }
      // Navigate to the listing page
      const url = `listing.html?id=${properties[index].id}`;
      console.log("Navigating to:", url);
      window.location.href = url;
    };
  });
});
