document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            document.getElementById('left-win').click();
            break;
        case 39:
            document.getElementById('right-win').click();
            break;
    }
};