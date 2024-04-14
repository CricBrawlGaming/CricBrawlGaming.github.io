class Slider {
  constructor(containerId, images) {
    this.container = document.getElementById(containerId);
    this.images = images;
    this.currentIndex = 0;
    this.slideInterval = null;

    // Initialize slider after DOM is fully loaded
    document.addEventListener("DOMContentLoaded", () => {
      this.init();
    });
  }

  init() {
    // Check if container exists
    if (!this.container) {
      console.error(
        `Slider container with id '${this.containerId}' not found.`
      );
      return;
    }

    // Check if images exist
    if (!Array.isArray(this.images) || this.images.length === 0) {
      console.error("Images array is empty or not provided.");
      return;
    }

    // Show initial image
    this.showSlide(this.currentIndex);

    // Add event listeners for previous and next buttons
    this.container
      .querySelector(".prev")
      .addEventListener("click", () => this.prevSlide());
    this.container
      .querySelector(".next")
      .addEventListener("click", () => this.nextSlide());

    // Start auto sliding
    this.startAutoSlide();
  }

  showSlide(index) {
    const image = this.container.querySelector(".slider-image");
    if (image && index >= 0 && index < this.images.length) {
      // Calculate the left position for the slide
      const leftPosition = -index * 100 + "%";
      // Set the left position of the image
      image.style.left = leftPosition;
      // Change the image src
      image.src = this.images[index];
      this.currentIndex = index;
      // Apply zoomIn animation directly by adding the class
      image.classList.add("zoomIn");
      // Remove the zoomIn class after a delay
      setTimeout(() => {
        image.classList.remove("zoomIn");
      }, 1000); // Adjust the timeout according to your animation duration
      // Restart auto slide timer
      this.stopAutoSlide();
      this.startAutoSlide();
    } else {
      console.error(`Image element not found or index out of range: ${index}`);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showSlide(this.currentIndex);
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showSlide(this.currentIndex);
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoSlide() {
    clearInterval(this.slideInterval);
  }

  triggerWowAnimation(element) {
    // Trigger wow.js animation for the specified element
    if (window.WOW) {
      const wow = new WOW({
        live: false, // Disable live demo mode
      });
      wow.show(element);
    }
  }
}
