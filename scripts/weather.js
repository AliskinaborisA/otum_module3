const backIcon2 = document.querySelector('.back-icon-2');

const sunButton = document.getElementById('sun-button');
const rainButton = document.getElementById('rain-button');
const stormButton = document.getElementById('storm-button');

const clouds = document.querySelectorAll(".cloud");
const sun = document.querySelector(".sun");
const lightning = document.querySelectorAll(".lightning");
const staticLightning = document.querySelectorAll(".static-lightning");
const rains= document.querySelectorAll(".raindrop");
const staticRains= document.querySelectorAll(".rain");

backIcon2.addEventListener('click', () => {
    weatherScreen.classList.remove('active');
    threeDoorsScreen.classList.add('active');
});

sunButton.addEventListener('click', e => {
    clouds.forEach(el => el.style.fill = 'white');
    sun.style.opacity = 1;
    rains.forEach(el => el.style.opacity = 0);
    staticRains.forEach(el => el.style.opacity = 0);

    sun.classList.add('sun-animate');
    lightning.forEach(el => el.classList.remove('lightning-animate'));
    staticLightning.forEach(el => el.style.opacity = 0);
    rains.forEach(el => el.classList.remove('raindrop-animate'));
});

rainButton.addEventListener('click', e => {
    clouds.forEach(el => el.style.fill = '#475B63');
    sun.style.opacity = 0;
    rains.forEach(el => el.style.opacity = 1);
    staticRains.forEach(el => el.style.opacity = 1);

    sun.classList.remove('sun-animate');
    lightning.forEach(el => el.classList.remove('lightning-animate'));
    staticLightning.forEach(el => el.style.opacity = 0);
    rains.forEach(el => el.classList.add('raindrop-animate'));
});

stormButton.addEventListener('click', e => {
    clouds.forEach(el => el.style.fill = '#131E27');
    sun.style.opacity = 0;
    rains.forEach(el => el.style.opacity = 0);
    staticRains.forEach(el => el.style.opacity = 0);

    sun.classList.remove('sun-animate');
    lightning.forEach(el => el.classList.add('lightning-animate'));
    staticLightning.forEach(el => el.style.opacity = 1);
    rains.forEach(el => el.classList.remove('raindrop-animate'));
});
