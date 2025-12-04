// Простая проверка формы
const form = document.querySelector('.contact-form');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Не перезагружать страницу
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (name && email) {
            alert('Сообщение отправлено!');
            form.reset(); // Очистить форму
        } else {
            alert('Заполните все поля!');
        }
    });
}