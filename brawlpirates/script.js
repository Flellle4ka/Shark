function openModal() {
    const modal = document.getElementById('modal');
    const input = document.getElementById('hashIdInput');
    input.value = ''; // Очищает поле ввода при открытии модального окна
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10); // Добавить небольшой таймаут, чтобы обеспечить применение CSS transition
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Таймаут должен совпадать с продолжительностью transition
}

function validateAndStartShuffle() {
    const input = document.getElementById('hashIdInput');
    const hashId = input.value.trim();
    
    if (hashId.length === 0) {
        input.classList.add('error');
        input.placeholder = 'Enter hash id';
    } else if (hashId.length !== 128) {
        input.classList.add('error');
        input.placeholder = 'Invalid Hash ID';
        input.value = ''; // Очистка поля ввода
    } else {
        input.classList.remove('error');
        document.getElementById('diamond').style.display = 'none'; // Скрыть алмаз
        startShuffle();
    }
}

function startShuffle() {
    document.getElementById('modal').style.display = 'none';
    document.querySelectorAll('.container img').forEach(img => {
        img.classList.remove('selected-skull'); // Сбрасывает выделение перед новой анимацией
    });
    shuffleSkulls();
}

function shuffleSkulls() {
    document.getElementById('message').textContent = '';
    let skulls = document.querySelectorAll('.container img');
    let intervals = 300; // Меньшие интервалы для более плавного движения
    let totalDuration = 3000;
    let steps = totalDuration / intervals;

    function shuffleStep(currentStep) {
        let positions = [0, 1, 2];
        positions.sort(() => Math.random() - 0.5);

        skulls.forEach((skull, index) => {
            let horizontalMove = positions[index] - index;
            let verticalMove = Math.random() > 0.5 ? 15 : -15;
            skull.style.transform = `translate(${horizontalMove * 105}px, ${verticalMove}px)`;
        });

        if (currentStep < steps) {
            setTimeout(() => shuffleStep(currentStep + 1), intervals);
        } else {
            setTimeout(() => {
                skulls.forEach((skull) => {
                    skull.style.transition = 'transform 0.5s cubic-bezier(0.32, 0.64, 0.45, 1)';
                    skull.style.transform = '';
                });
                displayRandomMessage(); // Показать случайное сообщение
            }, intervals);
        }
    }

    shuffleStep(1);
}

function displayRandomMessage() {
    const messages = ["Right Skull", "Middle Skull", "Left Skull"];
    const skullIds = ["skull3", "skull2", "skull1"];
    const randomIndex = Math.floor(Math.random() * messages.length);
    document.getElementById('message').textContent = messages[randomIndex];

    // Сбросить предыдущий выделенный череп
    document.querySelectorAll('.container img').forEach(img => {
        img.classList.remove('selected-skull');
        img.style.transform = '';
    });

    // Выделите новый выбранный череп и приподнимите его
    const selectedSkull = document.getElementById(skullIds[randomIndex]);
    selectedSkull.classList.add('selected-skull');
    selectedSkull.style.transform = 'translateY(-23px)';  // Поднять череп

    // Показать алмаз под выбранным черепом
    const diamond = document.getElementById('diamond');
    diamond.style.display = 'block';  // Сделать алмаз видимым
    diamond.style.left = `${selectedSkull.offsetLeft + selectedSkull.offsetWidth / 2 - diamond.offsetWidth / 2}px`;
    diamond.style.top = `${selectedSkull.offsetTop + selectedSkull.offsetHeight - 40}px`;  // Поднять алмаз выше
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        validateAndStartShuffle();
        // Скрыть клавиатуру, убрав фокус с input
        document.getElementById('hashIdInput').blur();
    }
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block'; // Сразу делаем элемент блочным, чтобы начать анимацию
    notification.style.top = '-10%'; // Начальное положение для анимации появления
    notification.style.opacity = '0'; // Начальная прозрачность

    // Плавное появление
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.top = '10%';
    }, 10);

    // Планирование плавного исчезновения
    setTimeout(() => {
        hideNotification();
    }, 10000); // Отображаем уведомление в течение 10 секунд
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.opacity = '0';
    notification.style.top = '-10%';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 1000); // Даем время на завершение анимации исчезновения
}

function startRandomNotification() {
    showNotification();
    setTimeout(startRandomNotification,  300000); // Следующее уведомление через 300000 миллисекунд (5 минут)
}

document.addEventListener('DOMContentLoaded', startRandomNotification);
