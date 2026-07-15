let currentIndex = 0;

function showNextSlide() {
    const slides = document.querySelector('.home');
    const totalSlides = document.querySelectorAll('.video-slide').length;
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(showNextSlide, 3000); // Change slide every 3 seconds