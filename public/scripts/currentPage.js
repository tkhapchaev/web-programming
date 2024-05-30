document.addEventListener('DOMContentLoaded', () => {
    let pathname = document.location.pathname;
    let currentPage = '';

    if (pathname === '/' || pathname.endsWith('/')) {
        currentPage = 'index';
    } else {
        currentPage = pathname.split('/').pop().replace('.html', '');
    }

    let htmlElement = document.getElementById(currentPage);
    if (htmlElement) {
        htmlElement.classList.add('current-page');
    }
});