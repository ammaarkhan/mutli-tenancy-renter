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

  // Sample property data
  const properties = [
    {
      id: "1",
      title: "Room with shared bath and kitchen in Corktown, Toronto.",
      location: "Etobicoke, Toronto",
      price: "C$ 1,200",
      rooms: 1,
      type: "shared",
      rentalType: "shared-house",
    },
    {
      id: "2",
      title: "Bright and Quiet furnished bedroom with private bathroom",
      location: "Etobicoke, Toronto",
      price: "C$ 1,200",
      rooms: 2,
      type: "entire",
      rentalType: "separate-unit",
    },
    {
      id: "3",
      title: "Cozy room in downtown Toronto with amenities",
      location: "Downtown, Toronto",
      price: "C$ 1,300",
      rooms: 3,
      type: "shared",
      rentalType: "shared-room",
    },
  ];

  // Filter functionality
  const rentalTypeFilterContainer = document.getElementById(
    "rental-dropdown-portal"
  );
  const rentalTypeFilterButton = document.getElementById("rental-type-btn");
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

  let selectedRentalTypes = [];
  let selectedHouseTypes = [];
  let selectedRooms = [];

  function filterProperties() {
    let filteredProperties = properties;

    // Apply rental type filter
    if (selectedRentalTypes.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        selectedRentalTypes.includes(property.rentalType)
      );
    }

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

    // Update listings count
    const listingsCount = document.querySelector(".listings-count");
    if (listingsCount) {
      listingsCount.textContent = `Showing ${filteredProperties.length} rooms`;
    }
  }

  if (rentalTypeFilterContainer) {
    // Initialize checkbox event listeners for rental type
    const rentalTypeCheckboxes = rentalTypeFilterContainer.querySelectorAll(
      'input[type="checkbox"]'
    );
    rentalTypeCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      checkbox.addEventListener("change", () => {
        selectedRentalTypes = Array.from(rentalTypeCheckboxes)
          .filter((cb) => cb.checked)
          .map((cb) => cb.value);
        filterProperties();
      });
    });
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

  // Handle filter dropdown toggles
  const filterPillButtons = document.querySelectorAll(".filter-pill");

  filterPillButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const dropdownId = button.getAttribute("data-dropdown");

      if (dropdownId) {
        const dropdown = document.getElementById(dropdownId);

        if (dropdown) {
          // Close all other dropdowns first
          document.querySelectorAll(".dropdown-menu").forEach((menu) => {
            if (menu.id !== dropdownId) {
              menu.style.display = "none";
            }
          });

          // Toggle this dropdown
          dropdown.style.display =
            dropdown.style.display === "block" ? "none" : "block";

          // Ensure dropdown is visible on mobile
          if (dropdown.style.display === "block" && window.innerWidth <= 768) {
            const rect = button.getBoundingClientRect();
            dropdown.style.left = "0";
            dropdown.style.top = button.offsetHeight + 4 + "px";
            dropdown.style.zIndex = "200";
          }
        }
      }
    });
  });

  // Special handling for house and rooms dropdowns
  const houseBtn = document.getElementById("house-type-btn");
  const houseDropdown = document.getElementById("house-dropdown");
  const roomsBtn = document.getElementById("rooms-btn");
  const roomsDropdown = document.getElementById("rooms-dropdown");

  if (houseDropdown) {
    const checkboxes = houseDropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  }

  if (roomsDropdown) {
    const checkboxes = roomsDropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  }

  // Special handling for rental type dropdown
  const rentalBtn = document.getElementById("rental-type-btn");
  const rentalDropdown = document.getElementById("rental-dropdown-portal");

  if (rentalDropdown) {
    const checkboxes = rentalDropdown.querySelectorAll(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".filter-pill") &&
      !e.target.closest(".dropdown-menu")
    ) {
      document.querySelectorAll(".dropdown-menu").forEach((dropdown) => {
        dropdown.style.display = "none";
      });
    }
  });
});
