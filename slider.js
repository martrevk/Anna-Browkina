document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.reviews-slider');
    const cards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    
    // Инициализация слайдера
    function initSlider() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            if (index === currentIndex) {
                card.classList.add('active');
            }
        });
    }
    
    // Показ слайда
    function showSlide(index) {
        // Обновляем классы для всех карточек
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next');
            
            if (i === index) {
                card.classList.add('active');
            } else if (i < index) {
                card.classList.add('prev');
            } else {
                card.classList.add('next');
            }
        });
        
        currentIndex = index;
    }
    
    // Переключение слайдов
    function nextSlide() {
        let newIndex = (currentIndex + 1) % cards.length;
        showSlide(newIndex);
    }
    
    function prevSlide() {
        let newIndex = (currentIndex - 1 + cards.length) % cards.length;
        showSlide(newIndex);
    }
    
    // Инициализация
    initSlider();
    
    // Обработчики событий
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Автопрокрутка
    let slideInterval = setInterval(nextSlide, 500000);
    
    // Остановка при наведении
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 500000);
    });
    
    // Для сенсорных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        slideInterval = setInterval(nextSlide, 5000);
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
});