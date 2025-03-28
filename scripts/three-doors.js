const door1 = document.querySelector('.door-1');
const door2 = document.querySelector('.door-2');
const door3 = document.querySelector('.door-3');

door1.addEventListener('click', () => {
    threeDoorsScreen.classList.remove('active');
    flappyPlaneScreen.classList.add('active');
});

door2.addEventListener('click', () => {
    threeDoorsScreen.classList.remove('active');
    receptionScreen.classList.add('active');
});

door3.addEventListener('click', () => {
    threeDoorsScreen.classList.remove('active');
    weatherScreen.classList.add('active');
});

