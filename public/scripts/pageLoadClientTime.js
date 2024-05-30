(function() {
    window.addEventListener('load', function() {
        let performanceEntries = performance.getEntriesByType('navigation');
        let navigationEntry = performanceEntries[0];
        let pageLoadTime = navigationEntry.loadEventStart - navigationEntry.startTime;

        document.getElementById('page-load-client-time-value').textContent = pageLoadTime.toFixed(3).toString();
    });
})();