// Get listing ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

// Sample data structure for a listing
let currentListing = null;

// Fetch listing data
async function fetchListingData(id) {
  // TODO: Replace with actual API call
  // For now, using mock data
  const mockListing = {
    id: id,
    title: "Room with shared bath and kitchen in Cooktown",
    location: "Cooktown, Toronto",
    price: 75,
    rating: 4.5,
    reviewCount: 123,
    description:
      "Welcome to this cozy room in the heart of Cooktown! This space features shared bathroom and kitchen facilities, perfect for travelers looking for a comfortable and affordable stay.",
    images: [
      "path/to/image1.jpg",
      "path/to/image2.jpg",
      "path/to/image3.jpg",
      "path/to/image4.jpg",
    ],
    amenities: [
      { name: "Wifi", icon: "fas fa-wifi" },
      { name: "Kitchen", icon: "fas fa-utensils" },
      { name: "Washer", icon: "fas fa-washing-machine" },
      { name: "Workspace", icon: "fas fa-desk" },
    ],
    host: {
      name: "John Doe",
      image: "path/to/host-image.jpg",
      joinDate: "January 2020",
    },
    coordinates: {
      lat: 43.6532,
      lng: -79.3832,
    },
  };

  return mockListing;
}

// Initialize image gallery
function initializeGallery(images) {
  const mainImage = document.getElementById("mainImage");
  const thumbnailGrid = document.querySelector(".thumbnail-grid");

  // Set main image
  mainImage.src = images[0];

  // Create thumbnails
  images.forEach((image, index) => {
    const thumbnail = document.createElement("img");
    thumbnail.src = image;
    thumbnail.alt = `Property image ${index + 1}`;
    thumbnail.addEventListener("click", () => {
      mainImage.src = image;
    });
    thumbnailGrid.appendChild(thumbnail);
  });
}

// Initialize amenities
function initializeAmenities(amenities) {
  const amenitiesGrid = document.querySelector(".amenities-grid");

  amenities.forEach((amenity) => {
    const amenityItem = document.createElement("div");
    amenityItem.className = "amenity-item";
    amenityItem.innerHTML = `
            <i class="${amenity.icon}"></i>
            <span>${amenity.name}</span>
        `;
    amenitiesGrid.appendChild(amenityItem);
  });
}

// Initialize map
function initializeMap(coordinates) {
  const map = new google.maps.Map(document.getElementById("propertyMap"), {
    center: coordinates,
    zoom: 15,
  });

  new google.maps.Marker({
    position: coordinates,
    map: map,
  });
}

// Update page content
function updatePageContent(listing) {
  document.getElementById("propertyTitle").textContent = listing.title;
  document.getElementById("propertyLocation").textContent = listing.location;
  document.getElementById("ratingValue").textContent = listing.rating;
  document.getElementById(
    "reviewCount"
  ).textContent = `(${listing.reviewCount} reviews)`;
  document.getElementById("priceValue").textContent = `$${listing.price}`;
  document.getElementById("propertyDescription").textContent =
    listing.description;
  document.getElementById("hostName").textContent = listing.host.name;
  document.getElementById("hostImage").src = listing.host.image;
  document.getElementById(
    "hostJoinDate"
  ).textContent = `Member since ${listing.host.joinDate}`;
}

// Initialize page
async function initializePage() {
  if (!listingId) {
    console.error("No listing ID provided");
    return;
  }

  try {
    currentListing = await fetchListingData(listingId);

    updatePageContent(currentListing);
    initializeGallery(currentListing.images);
    initializeAmenities(currentListing.amenities);
    initializeMap(currentListing.coordinates);
  } catch (error) {
    console.error("Error initializing page:", error);
  }
}

// Initialize booking calendar
function initializeCalendar() {
  // TODO: Implement calendar functionality
  // This could be done using a library like FullCalendar or a custom implementation
}

// Add event listener for booking button
document.querySelector(".book-now-btn").addEventListener("click", () => {
  // TODO: Implement booking functionality
  alert("Booking functionality coming soon!");
});

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);

document.addEventListener("DOMContentLoaded", function () {
  // Mobile detection utility
  const isMobile = () => window.innerWidth <= 768;

  // Handle booking sidebar on mobile
  const bookingSidebar = document.querySelector(".booking-sidebar");
  const priceDetails = document.querySelector(".price-details");

  if (bookingSidebar && isMobile()) {
    // Make price details clickable to expand sidebar
    priceDetails.style.cursor = "pointer";
    priceDetails.addEventListener("click", () => {
      bookingSidebar.classList.toggle("expanded");
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
      if (!bookingSidebar.contains(e.target)) {
        bookingSidebar.classList.remove("expanded");
      }
    });

    // Prevent sidebar from closing when clicking inside
    bookingSidebar.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Handle image gallery
  const mainImage = document.querySelector(".main-image img");
  const thumbnails = document.querySelectorAll(".thumbnail-grid img");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Update main image
      const newSrc = thumbnail.src;
      mainImage.src = newSrc;

      // Update active state
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      thumbnail.classList.add("active");
    });
  });

  // Handle property navigation scrolling
  const propertyNav = document.querySelector(".property-nav");
  if (propertyNav) {
    let isScrolling = false;

    propertyNav.addEventListener("scroll", () => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
          const showLeftShadow = propertyNav.scrollLeft > 0;
          const showRightShadow =
            propertyNav.scrollLeft <
            propertyNav.scrollWidth - propertyNav.clientWidth;

          propertyNav.classList.toggle("shadow-left", showLeftShadow);
          propertyNav.classList.toggle("shadow-right", showRightShadow);
          isScrolling = false;
        });
      }
    });

    // Handle nav item clicks
    const navItems = propertyNav.querySelectorAll("a");
    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();

        // Remove active class from all items
        navItems.forEach((navItem) => navItem.classList.remove("active"));

        // Add active class to clicked item
        item.classList.add("active");

        // Scroll to section
        const targetId = item.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const yOffset = -100; // Account for sticky header
          const y =
            targetSection.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    });
  }

  // Handle date inputs
  const dateInputs = document.querySelectorAll(".date-field input");
  dateInputs.forEach((input) => {
    // Prevent keyboard on mobile
    if (isMobile()) {
      input.addEventListener("click", (e) => {
        e.preventDefault();
        input.blur();
        // Here you would typically open a custom date picker
        console.log("Open custom date picker");
      });
    }
  });

  // Add co-applicant button
  const addApplicantBtn = document.querySelector(".add-applicant");
  if (addApplicantBtn) {
    addApplicantBtn.addEventListener("click", () => {
      console.log("Open co-applicant modal");
      // Here you would typically open a modal to add co-applicant
    });
  }

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const isMobileView = isMobile();
      document.body.classList.toggle("is-mobile", isMobileView);

      // Reset sidebar state on breakpoint change
      if (!isMobileView && bookingSidebar) {
        bookingSidebar.classList.remove("expanded");
      }
    }, 250);
  });

  // Initialize mobile detection
  document.body.classList.toggle("is-mobile", isMobile());
});
