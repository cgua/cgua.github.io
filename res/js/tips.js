/* eslint-disable no-undef */

window.addEventListener('load', (ev) => {
    const arr = document.querySelectorAll('[data-tips]');

    for (const ele of arr) {
        ele.addEventListener('mouseover', () => {
            console.log(ele.getAttribute('data-tips'));
        });
    }
});
