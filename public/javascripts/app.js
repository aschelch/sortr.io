document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            el = document.getElementById('left-win');
            el.classList.add('is-active');
            el.click();
            break;
        case 39:
            el = document.getElementById('right-win');
            el.classList.add('is-active');
            el.click();
            break;
    }
};