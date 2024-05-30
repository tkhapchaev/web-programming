document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
    document.getElementById('checkout-form').addEventListener('submit', submitOrder);
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Корзина пуста';
        emptyMessage.style.textAlign = 'center';
        cartItemsContainer.appendChild(emptyMessage);
    } else {
        cartItems.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'cart-item';
            element.innerHTML = `
                <h3 class="cart-item-title">${item.title} (${item.author}) - ${item.price} ₽</h3>
                <button onclick="removeItemFromCart(${index})" class="cart-remove-item-button">Удалить</button>
            `;
            cartItemsContainer.appendChild(element);
        });
    }
}

function removeItemFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

function submitOrder(event) {
    event.preventDefault();
    const userId = parseInt(localStorage.getItem('userId'), 10);
    if (!userId) {
        Swal.fire({
            icon: 'warning',
            title: 'Необходима аутентификация',
            text: 'Сначала зарегистрируйтесь или войдите в систему',
            confirmButtonColor: '#cfcfcf',
        });
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Корзина пуста',
            confirmButtonColor: '#cfcfcf',
        });
        return;
    }

    const items = cartItems.map(item => `${item.author} - ${item.title}`);
    const orderData = {
        userId,
        items
    };
    console.log(orderData);

    fetch('/order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderData),
    })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('cart');
                displayCartItems();
                Swal.fire({
                    icon: 'success',
                    title: 'Заказ оформлен',
                    text: 'Спасибо! Ваш заказ принят в обработку',
                    confirmButtonColor: '#cfcfcf',
                });
            } else {
                throw new Error('Что-то пошло не так. Пожалуйста, попробуйте снова');
            }
        })
        .catch(error => {
            console.error('Ошибка при оформлении заказа:', error);
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: error.message,
                confirmButtonColor: '#cfcfcf',
            });
        });
}
