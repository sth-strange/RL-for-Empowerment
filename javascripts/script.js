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

            // Устанавливаем положение всплывающего элемента
            tooltip.style.left = `${rect.right + window.pageXOffset - 30}px`; // Смещаем влево на 10px
            tooltip.style.top = `${rect.top + window.pageYOffset - tooltip.offsetHeight - 30}px`; // Смещаем вверх на высоту pop-up и немного

            // Показываем всплывающий элемент
            tooltip.style.display = 'block';
        });

        button.addEventListener('mouseleave', function () {
            // Скрываем всплывающее сообщение при выходе курсора
            tooltip.style.display = 'none';
        });
    });
});
