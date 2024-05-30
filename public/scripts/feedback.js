document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('feedback-form').addEventListener('submit', submitFeedback);
});

function submitFeedback(event) {
    event.preventDefault();

    const authorInput = document.getElementById('feedback-input-author');
    const bookInput = document.getElementById('feedback-input-book');
    const contentsInput = document.getElementById('feedback-input-contents');
    const userId = parseInt(localStorage.getItem('userId'), 10);

    const author = authorInput.value.trim();
    const book = bookInput.value.trim();
    const contents = contentsInput.value.trim();

    if (!author || !book || !contents) {
        alert('Все поля должны быть заполнены');

        return;
    }

    if (!userId) {
        alert('Ошибка аутентификации пользователя');

        return;
    }

    const reviewData = {
        author,
        book,
        content: contents,
        userId
    };
    console.log(JSON.stringify(reviewData));
    fetch('/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            drawFeedback(reviewData);
            return response.json();
        })
        .then(data => {
            console.log('Ответ сервера:', data);
            authorInput.value = '';
            bookInput.value = '';
            contentsInput.value = '';
            alert('Ваш отзыв успешно добавлен!');
        })
        .catch(error => {
            console.error('Ошибка при отправке отзыва:', error);
            alert('Произошла ошибка при отправке отзыва');
        });
}


function drawFeedback(reviewData) {
    let author = reviewData.author;
    let book = reviewData.book;
    let content = reviewData.content;

    if (author > 120) {
        author = split(author)
    }

    if (book > 120) {
        book = split(book)
    }

    if (content > 120) {
        content = split(content)
    }

    const feedbackList = document.getElementById('feedback-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Автор: ${author}, Книга: ${book}, Отзыв: ${content}`;
    feedbackList.appendChild(listItem);
}

function split(string) {
    const chunks = [];

    for (let i = 0; i < string.length; i += 120) {
        chunks.push(string.substring(i, i + 120));
    }

    return chunks.join('\n');
}
