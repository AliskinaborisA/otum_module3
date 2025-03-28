const backIcon = document.querySelector('.back-icon');
const leftChevron = document.querySelector('.left-chevron');
const rightChevron = document.querySelector('.right-chevron');
const man = document.querySelector('.man');
const bell = document.querySelector('.bell');
const clickOnMeText = document.querySelector('.click-on-me-text')
const sadText = document.querySelector('.sad-text');
const twinkText = document.querySelector('.twink-text');
const smileText = document.querySelector('.smile-text');

let currentIndex = 0;

const images = [
    'assets/sad-man.png',
    'assets/smile-man.png',
    'assets/twink-man.png'
];

backIcon.addEventListener('click', () => {
    receptionScreen.classList.remove('active');
    threeDoorsScreen.classList.add('active');
});

bell.addEventListener('click', () => {
    man.style.opacity = 1;
    man.style.pointerEvents = 'auto';

    clickOnMeText.style.opacity = 0;

    leftChevron.style.opacity = 1;
    leftChevron.style.pointerEvents = 'auto';
    rightChevron.style.opacity = 1;
    rightChevron.style.pointerEvents = 'auto';
});

leftChevron.addEventListener('click', () => {
    changeImage('right');
    sadText.style.opacity = 0;
    smileText.style.opacity = 0;
    twinkText.style.opacity = 0;
});

rightChevron.addEventListener('click', () => {
    changeImage('left');
    sadText.style.opacity = 0;
    smileText.style.opacity = 0;
    twinkText.style.opacity = 0;
});

man.addEventListener('click', () => {
    const currentSrc = man.src.substring(man.src.indexOf('assets'));
    if (currentSrc === images[0]) { // sad
        sadText.style.opacity = 1;
        smileText.style.opacity = 0;
        twinkText.style.opacity = 0;
    } else if (currentSrc === images[1]) { // smile
        sadText.style.opacity = 0;
        smileText.style.opacity = 1;
        twinkText.style.opacity = 0;
    } else { // twink
        sadText.style.opacity = 0;
        smileText.style.opacity = 0;
        twinkText.style.opacity = 1;
    }
});

// Функция смены изображения
function changeImage(direction) {
    const slideOutClass = direction === 'left' ? 'slide-out-right' : 'slide-out-left';
    const bounceInClass = direction === 'left' ? 'bounce-in-left' : 'bounce-in-right';

    // Добавляем класс для анимации вылета текущего изображения
    man.classList.add(slideOutClass);

    // После завершения анимации вылета меняем изображение и запускаем вход с bounce-эффектом
    man.addEventListener('animationend', function handler() {
        // Убираем класс вылета
        man.classList.remove(slideOutClass);
        // Вычисляем новый индекс
        if (direction === 'left') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else {
            currentIndex = (currentIndex + 1) % images.length;
        }
        // Меняем источник изображения
        man.src = images[currentIndex];
        // Добавляем класс bounce-in для входа
        man.classList.add(bounceInClass);

        // После завершения анимации входа убираем класс bounce
        man.addEventListener('animationend', function handler2() {
            man.classList.remove(bounceInClass);
            man.removeEventListener('animationend', handler2);
        });
        man.removeEventListener('animationend', handler);
    });
}

// Функция для получения времени в заданном часовом поясе с помощью Intl.DateTimeFormat
function getTimeInTimeZone(timeZone) {
    const now = new Date();
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false, timeZone };
    const formatter = new Intl.DateTimeFormat([], options);
    const parts = formatter.formatToParts(now);
    const timeParts = {};
    parts.forEach(({ type, value }) => {
        if (type !== 'literal') {
            timeParts[type] = parseInt(value, 10);
        }
    });
    return {
        hours: timeParts.hour || now.getHours(),
        minutes: timeParts.minute || now.getMinutes(),
        seconds: timeParts.second || now.getSeconds()
    };
}

function updateClocks() {
    document.querySelectorAll('.clock-container').forEach(container => {
        const timeZone = container.getAttribute('data-timezone');
        const { hours, minutes } = getTimeInTimeZone(timeZone);

        // Вычисление углов для стрелок
        const hourAngle = ((hours - 3) % 12) * 30 + (minutes - 15) * 0.5; // 30 градусов на час + 0.5 на минуту
        const minuteAngle = (minutes - 15) * 6; // 6 градусов на минуту

        const hourHand = container.querySelector('.hand.hour');
        const minuteHand = container.querySelector('.hand.minute');

        hourHand.style.transform = `rotate(${hourAngle}deg)`;
        minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    });
}

// Первичное обновление и последующие обновления каждую минуту
updateClocks();
setInterval(updateClocks, 1000);

