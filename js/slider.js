class Slider {
  constructor(containerSelector, carouselSelector, intervalTime) {
    this.wrapper = document.querySelector(containerSelector);
    this.carousel = this.wrapper.querySelector(carouselSelector);
    this.images = this.carousel.querySelectorAll("img");
    this.imageIndex = 0;
    this.intervalId = null;
    this.intervalTime = intervalTime;

    this.autoSlide = this.autoSlide.bind(this);
    this.slideImage = this.slideImage.bind(this);

    this.init();
  }

  init() {
    this.autoSlide();
    this.wrapper.addEventListener("mouseover", () =>
      clearInterval(this.intervalId)
    );
    this.wrapper.addEventListener("mouseleave", this.autoSlide);
  }

  autoSlide() {
    this.intervalId = setInterval(this.slideImage, this.intervalTime);
  }

  slideImage() {
    this.carousel.style.transform = `translate(-${this.imageIndex * 100}%)`;

    if (this.imageIndex >= this.images.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex++;
    }
  }
}
