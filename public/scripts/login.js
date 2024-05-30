document.addEventListener('DOMContentLoaded', function() {
    fetch('/auth/status')
        .then(response => response.json())
        .then(data => {
            if (data.isAuthenticated) {
                localStorage.setItem('userId', data.userId);
                updateUI(true, data.user.name);
            } else {
                localStorage.removeItem('userId');
                updateUI(false, null);
            }
        })
        .catch(error => {
            console.error('Failed to fetch auth status:', error);
        });
});

function updateUI(isAuthenticated, username) {
    const userDisplay = document.querySelector('.user-display');
    const loginForm = document.querySelector('.login-form-container');
    const logoutForm = document.querySelector('.logout-form-container');

    if (isAuthenticated) {
        userDisplay.innerHTML = `Привет, ${username}!`;
        loginForm.style.display = 'none';
        logoutForm.style.display = 'block';
    } else {
        userDisplay.innerHTML = 'Привет, гость!';
        loginForm.style.display = 'block';
        logoutForm.style.display = 'none';
    }
}

function handleAuthCallback(data) {
    if (data.isAuthenticated) {
        localStorage.setItem('userId', data.user.id);
        updateUI(true, data.user.name);
    } else {
        localStorage.removeItem('userId');
        updateUI(false, null);
    }
}

document.querySelector('.logout-form-container form').addEventListener('submit', function() {
    localStorage.removeItem('userId');
});
