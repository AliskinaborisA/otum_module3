const theOTUM = document.querySelector('.the-otum');

theOTUM.addEventListener('click', () => {
    welcomeScreen.classList.remove('active');
    threeDoorsScreen.classList.add('active');
});

document.addEventListener('DOMContentLoaded', () => {
    theOTUM.addEventListener('animationend', () => {
        theOTUM.classList.add('animation-complete');
    });
});