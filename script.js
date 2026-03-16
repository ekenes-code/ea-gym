// Находим элементы
const aiButton = document.getElementById('aiButton');
const aiChat = document.getElementById('aiChat');
const closeAI = document.getElementById('closeAI');
const aiInput = document.querySelector('.ai-input');
const aiMessages = document.querySelector('.ai-messages');

// Открытие чата по кнопке
aiButton.addEventListener('click', () => {
    aiChat.style.display = 'flex';
    aiInput.focus(); // сразу фокус на поле ввода
});

// Закрытие чата по крестику
closeAI.addEventListener('click', () => {
    aiChat.style.display = 'none';
});

// Обработка отправки сообщения (Enter)
aiInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && aiInput.value.trim() !== '') {
        const userMessage = aiInput.value.trim();

        // Добавляем сообщение пользователя в чат
        const p = document.createElement('p');
        p.textContent = userMessage;
        aiMessages.appendChild(p);

        aiInput.value = ''; // очищаем поле

        // Скроллим чат вниз
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }
});