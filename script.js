document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Функция toggleMenu
    function toggleMenu() {
        burger.classList.toggle('open');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Блокировка скролла при открытом меню
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Обработчик для бургера
    burger.addEventListener('click', toggleMenu);
    
    // Обработчик для оверлея
    overlay.addEventListener('click', toggleMenu);
    
    // Обработчики для ссылок меню (на мобильных)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
});




