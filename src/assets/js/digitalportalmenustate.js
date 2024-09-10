changehtmltagcss = () => {
    var element = document.getElementById("mainheader");

    if (localStorage.getItem('digitalportalmenustate') === 'full') {
        element.classList.add("navbar-vertical-collapsed");
        localStorage.setItem('digitalportalmenustate', "collapsed");
    } else {
        element.classList.remove("navbar-vertical-collapsed");
        localStorage.setItem('digitalportalmenustate', "full");
    }
}

window.onload = function () {
    var element = document.getElementById("mainheader");
    element.classList.remove("navbar-vertical-collapsed");
}

changehtmlhoverovertagcss = () => {
    if (localStorage.getItem('digitalportalmenustate') === 'collapsed') {
        var element = document.getElementById("mainheader");
        element.classList.add("navbar-vertical-collapsed-hover");
    }
}

changehtmlhoverouttagcss = () => {
    if (localStorage.getItem('digitalportalmenustate') === 'collapsed') {
        var element = document.getElementById("mainheader");
        element.classList.remove("navbar-vertical-collapsed-hover");
    }
}