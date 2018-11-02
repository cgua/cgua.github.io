window.addEventListener('load', (ev) => {
    const arr = document.querySelectorAll('[data-tips]');
    for (let ele of arr) {
        ele.addEventListener('mouseover', function () {
            console.log(ele.getAttribute('data-tips'));
        });
    }
});