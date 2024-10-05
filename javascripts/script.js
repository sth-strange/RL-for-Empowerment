document.addEventListener('DOMContentLoaded', function () {
    // Находим все неактивные кнопки
    const inactiveButtons = document.querySelectorAll('.button.non_active');

    // Создаем элемент для всплывающего сообщения
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = 'coming soon';
    document.body.appendChild(tooltip);

    // Скрываем всплывающий элемент по умолчанию
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    tooltip.style.padding = '5px 10px';
    tooltip.style.backgroundColor = '#D9D9D9';
    tooltip.style.color = 'black';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';

    // Добавляем обработчики событий для каждой неактивной кнопки
    inactiveButtons.forEach(button => {
        button.addEventListener('mouseenter', function (event) {
            // Определяем положение кнопки
            const rect = button.getBoundingClientRect();

            // Проверяем ширину экрана
            if (window.innerWidth <= 768) {
                // Позиционирование для мобильных устройств
                tooltip.style.left = `${rect.left + window.pageXOffset}px`; // Сместим относительно начала кнопки
                tooltip.style.top = `${rect.bottom + window.pageYOffset + 10}px`; // Сместим под кнопку
            } else {
                // Позиционирование для десктопных устройств
                tooltip.style.left = `${rect.right + window.pageXOffset - 30}px`; // Смещаем влево на 10px
                tooltip.style.top = `${rect.top + window.pageYOffset - tooltip.offsetHeight - 30}px`; // Смещаем вверх на высоту pop-up и немного
            }

            // Показываем всплывающий элемент
            tooltip.style.display = 'block';
        });

        button.addEventListener('mouseleave', function () {
            // Скрываем всплывающее сообщение при выходе курсора
            tooltip.style.display = 'none';
        });
    });
});

document.getElementById('subscribe-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;

    // Отправляем email на ваш Cloudflare Worker
    fetch('https:///sweet-pond-ab19.six-of-proxies.workers.dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('subscribe-message').textContent = 'Success!';
        } else {
            document.getElementById('subscribe-message').textContent = 'Error. Try again.';
        }
    })
    .catch(error => {
        document.getElementById('subscribe-message').textContent = 'Error. Try again.';
    });
});
