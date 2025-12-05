// ========== КНОПКА "НАВЕРХ" ==========
document.addEventListener('DOMContentLoaded', function () {

    // 1. Создаем кнопку
    const topBtn = document.createElement('button');
    topBtn.id = 'topBtn';
    topBtn.innerHTML = '↑';
    topBtn.title = 'Наверх';
    document.body.appendChild(topBtn);

    console.log('Кнопка создана');

    // 2. Показывать/скрывать при прокрутке
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            topBtn.style.display = 'block';
        } else {
            topBtn.style.display = 'none';
        }
    });

    // 3. При клике - наверх
    topBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Сразу скрываем кнопку
    topBtn.style.display = 'none';

    // ========== ПОДСВЕТКА МЕНЮ ==========
    const links = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop();

    links.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});