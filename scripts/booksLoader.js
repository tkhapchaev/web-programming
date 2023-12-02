document.addEventListener("DOMContentLoaded", function() {
    const booksContainer = document.querySelector(".books-grid-container");
    const preloader = document.createElement("div");
    const numOfPreloaders = 5
    const preloaders = []

    preloader.className = "preloader-grid-item";
    preloader.innerHTML = '<div class="preloader-contents"><img src="../gifs/preloader.gif" alt="Загрузка..."></div>';

    for (let i = 0; i < numOfPreloaders; i++) {
        preloaders.push(booksContainer.appendChild(preloader.cloneNode(true)))
    }

    const currentPage = document.location.pathname.split('/').pop().replace('.html', '');

    fetch("https://my-json-server.typicode.com/tkhapchaev/placeholder-mock/" + currentPage)
        .then(response => {
            if (!response.ok) {
                throw new Error("Response was not ok");
            }

            return response.json();
        })
        .then(data => {
            preloaders.forEach(preloader => preloader.style.display = "none")
            renderBooks(data, booksContainer);
        })
        .catch(error => {
            console.error("An error occurred during request processing:", error);
            preloader.innerHTML = '<div class="preloader"><p>Упс! Что-то пошло не так...</p></div>';
        });
});

function renderBooks(data, container) {
    const sortedData = data.sort(() => 0.5 - Math.random());

    sortedData.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.className = "book-grid-item";

        bookItem.innerHTML = `
            <div class="book-image">
                <img src="${book.image}" alt="${book.title} (${book.author})">
            </div>
            <div class="book-about">
                <h3 class="book-title">${book.title}</h3>
                <h4 class="book-author">${book.author}</h4>
                <button class="book-buy-button">Купить</button>
                <h5 class="book-price-value">${book.price} ₽</h5>
            </div>
        `;

        container.appendChild(bookItem);
    });
}
