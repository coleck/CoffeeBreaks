// scripts/shop.js - СУПЕР ПРОСТОЙ РАБОЧИЙ ВАРИАНТ
document.addEventListener('DOMContentLoaded', function () {
    console.log('Корзина загружается...');

    // 1. Переменные для корзины
    let cartItems = [];
    let cartTotal = 0;

    // 2. Элементы страницы
    const cartContainer = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.total-price');
    const emptyMessage = document.querySelector('.cart-empty');
    const checkoutButton = document.querySelector('.checkout-btn');

    // 3. Функция обновления корзины
    function updateCartDisplay() {
        // Очищаем корзину
        cartContainer.innerHTML = '';

        // Если корзина пуста
        if (cartItems.length === 0) {
            emptyMessage.style.display = 'block';
            totalElement.textContent = '0 ₽';
            return;
        }

        // Скрываем сообщение "пусто"
        emptyMessage.style.display = 'none';

        // Добавляем каждый товар
        cartItems.forEach(function (item, index) {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price} ₽</span>
                <button class="remove-btn" data-index="${index}">X</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        // Обновляем сумму
        totalElement.textContent = cartTotal + ' ₽';

        // Вешаем обработчики на кнопки удаления
        document.querySelectorAll('.remove-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }

    // 4. Добавить товар
    function addToCart(productName, productPrice) {
        cartItems.push({
            name: productName,
            price: productPrice
        });
        cartTotal += productPrice;
        updateCartDisplay();
        console.log('Добавлен:', productName, productPrice);
    }

    // 5. Удалить товар
    function removeFromCart(index) {
        if (index >= 0 && index < cartItems.length) {
            cartTotal -= cartItems[index].price;
            cartItems.splice(index, 1);
            updateCartDisplay();
        }
    }

    // 6. Обработка кнопок "В корзину"
    const addButtons = document.querySelectorAll('.product-btn:not(:disabled)');
    console.log('Найдено кнопок:', addButtons.length);

    addButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Находим карточку товара
            const productCard = this.closest('.product-card');

            // Получаем название и цену
            const name = productCard.querySelector('.product-name').textContent;
            const priceText = productCard.querySelector('.product-price').textContent;

            // Преобразуем цену (убираем всё кроме цифр)
            const price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;

            console.log('Нажата кнопка:', name, 'Цена:', price);

            // Добавляем в корзину
            addToCart(name, price);

            // Визуальный фидбэк
            const originalText = this.textContent;
            this.textContent = '✓ Добавлено';
            this.style.backgroundColor = '#4CAF50';

            // Возвращаем через 1 секунду
            setTimeout(function () {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1000);
        });
    });

    // 7. Оформление заказа
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            if (cartItems.length === 0) {
                alert('Корзина пуста! Добавьте товары.');
                return;
            }

            const confirmOrder = confirm('Оформить заказ на сумму ' + cartTotal + ' ₽?');
            if (confirmOrder) {
                alert('Заказ оформлен! Спасибо за покупку!');
                // Очищаем корзину
                cartItems = [];
                cartTotal = 0;
                updateCartDisplay();
            }
        });
    }

    // 8. ФИЛЬТРАЦИЯ (если есть кнопки фильтров)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        console.log('Найдены кнопки фильтров:', filterButtons.length);

        filterButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                // Убираем active у всех
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем текущей
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                const categories = document.querySelectorAll('.shop-category');

                categories.forEach(function (category) {
                    if (filterValue === 'all') {
                        category.style.display = 'block';
                    } else if (category.getAttribute('data-category') === filterValue) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                });
            });
        });
    }

    console.log('Корзина готова к работе!');
});