document.addEventListener("DOMContentLoaded", function() {
    const booksContainer = document.querySelector(".books-grid-container");
    if (!booksContainer) return;

    const currentPage = window.location.pathname === '/' || window.location.pathname === '/index.html' ? 'index' :
        window.location.pathname.includes('catalog') ? 'catalog' :
            window.location.pathname.includes('top-of-the-week') ? 'top-of-the-week' : 'index';

    createPreloaders(5, booksContainer);
    fetchBooksAndRender(booksContainer, currentPage);
});

function createPreloaders(num, container) {
    for (let i = 0; i < num; i++) {
        const preloader = document.createElement("div");
        preloader.className = "preloader-grid-item";
        preloader.innerHTML = '<div class="preloader-contents"><img src="../gifs/preloader.gif" alt="Loading..."></div>';
        container.appendChild(preloader);
    }
}

function fetchBooksAndRender(container, page) {
    fetch(`/books?page=${page}`)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            renderBooks(data, container);
        })
        .catch(error => {
            console.error("Failed to fetch books:", error);
            container.innerHTML = '<div class="preloader"><p>Failed to load books.</p></div>';
        });
}


function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire({
        title: 'Успешно',
        text: `Книга "${book.title}" добавлена в корзину`,
        icon: 'success',
        confirmButtonColor: '#cfcfcf'
    });
}

function renderBooks(books, container) {
    container.innerHTML = '';
    books.forEach(book => {
        const element = document.createElement("div");
        element.className = "book-grid-item";
        element.innerHTML = `
            <div class="book-image">
                <img src="${book.coverImage}" alt="${book.title} (${book.author})">
            </div>
            <div class="book-about">
                <h3 class="book-title">${book.title}</h3>
                <h4 class="book-author">${book.author}</h4>
                <button class="book-buy-button">Купить</button>
                <h5 class="book-price-value">${book.price} ₽</h5>
            </div>
        `;
        container.appendChild(element);

        element.querySelector('.book-buy-button').addEventListener('click', () => addToCart(book));
    });
}
