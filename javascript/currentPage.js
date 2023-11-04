document.addEventListener('DOMContentLoaded', () => {
    let currentPage = document.location.pathname.split('/').pop().replace('.html', '');
    let htmlElement = document.getElementById(currentPage);

    if (htmlElement) {
        htmlElement.classList.add('current-page');
    }
});
