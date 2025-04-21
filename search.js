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
    },
    {
      id: "2",
      title: "Bright and Quiet furnished bedroom with private bathroom",
      location: "Etobicoke, Toronto",
      price: "C$ 1,200",
      rooms: 2,
      type: "entire",
    },
    {
      id: "3",
      title: "Cozy room in downtown Toronto with amenities",
      location: "Downtown, Toronto",
      price: "C$ 1,300",
      rooms: 3,
      type: "shared",
    },
  ];

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

  // Mobile detection utility
  const isMobile = () => window.innerWidth <= 768;

  // Handle filter pills scrolling
  const filterPills = document.querySelector(".filter-pills");
  let isScrolling = false;

  if (filterPills) {
    filterPills.addEventListener("scroll", () => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
          // Add shadow indicators based on scroll position
          const showLeftShadow = filterPills.scrollLeft > 0;
          const showRightShadow =
            filterPills.scrollLeft <
            filterPills.scrollWidth - filterPills.clientWidth;

          filterPills.classList.toggle("shadow-left", showLeftShadow);
          filterPills.classList.toggle("shadow-right", showRightShadow);

          isScrolling = false;
        });
      }
    });
  }

  // Handle filter menu on mobile
  const filterToggle = document.querySelector(".filter-toggle");
  const filtersContainer = document.querySelector(".search-filters-container");

  if (filterToggle && filtersContainer) {
    filterToggle.addEventListener("click", () => {
      filtersContainer.classList.toggle("expanded");
      document.body.classList.toggle("filters-open");
    });

    // Close filters when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !filtersContainer.contains(e.target) &&
        !filterToggle.contains(e.target) &&
        filtersContainer.classList.contains("expanded")
      ) {
        filtersContainer.classList.remove("expanded");
        document.body.classList.remove("filters-open");
      }
    });
  }

  // Handle responsive search field behavior
  const searchFields = document.querySelectorAll(".search-field input");

  searchFields.forEach((field) => {
    field.addEventListener("focus", () => {
      if (isMobile()) {
        field.parentElement.classList.add("focused");
        // Scroll the field into view to prevent keyboard from hiding it
        field.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    field.addEventListener("blur", () => {
      field.parentElement.classList.remove("focused");
    });
  });

  // Handle window resize events
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Update mobile-specific UI elements
      const isMobileView = isMobile();
      document.body.classList.toggle("is-mobile", isMobileView);

      // Reset filters menu state on breakpoint change
      if (!isMobileView) {
        filtersContainer.classList.remove("expanded");
        document.body.classList.remove("filters-open");
      }
    }, 250);
  });

  // Initialize mobile detection on load
  document.body.classList.toggle("is-mobile", isMobile());
});
