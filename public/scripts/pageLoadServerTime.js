document.addEventListener("DOMContentLoaded", function() {
    fetch(window.location.href)
        .then(response => {
            const loadTime = response.headers.get('X-Response-Time');

            if (loadTime) {
                document.getElementById('page-load-server-time-value').textContent = loadTime.toString();
            }
        })
        .catch(error => console.log('Error getting page load server time', error));
});