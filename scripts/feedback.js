const feedbackFromStorage = JSON.parse(localStorage.getItem("feedback")) || [];

feedbackFromStorage.forEach(item => {
    const { author, book, contents, id } = item;
    drawFeedback(author, book, contents, id);
})

/*
* (!) Лабораторная работа #7
*
* Для сообщений пользователю и кастомизации стандартных alert'ов используется библиотека sweetalert2:
* https://github.com/sweetalert2/sweetalert2
* https://sweetalert2.github.io/
*
* Параметры:
* icon - тип иконки
* title - заголовок
* text - текст
* iconColor - цвет иконки
* confirmButtonColor - цвет кнопки подтверждения
* cancelButtonColor - цвет кнопки отмены
* confirmButtonText - текст кнопки подтверждения
* cancelButtonText - текст кнопки отмены
* timer - время (в ms), после которого окно с сообщением автоматически закроется
*
* */

function addFeedback() {
    const feedback = JSON.parse(localStorage.getItem("feedback")) || [];

    const author = document.getElementById("feedback-input-author").value;
    const book = document.getElementById("feedback-input-book").value;
    const contents = document.getElementById("feedback-input-contents").value;
    const id = Math.random().toString(16).slice(2);

    if (author === '' || book === '' || contents === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Заполните все поля',
            iconColor: '#ff5f5f',
            confirmButtonColor: '#cfcfcf',
            timer: 60000
        });

        return;
    }

    feedback.push({ id, author, book, contents });

    localStorage.setItem("feedback", JSON.stringify(feedback));

    document.getElementById("feedback-input-author").value = "";
    document.getElementById("feedback-input-book").value = "";
    document.getElementById("feedback-input-contents").value = "";

    drawFeedback(author, book, contents, id);
}

function submitFeedback() {
    event.preventDefault();
    const feedback = document.getElementById("feedback-list");

    if (feedback.innerHTML.trim()) {
        feedback.innerHTML = "";

        Swal.fire({
            icon: 'success',
            title: 'Успешно',
            text: 'Отзывы отправлены. Спасибо!',
            confirmButtonColor: '#cfcfcf',
            timer: 60000
        });

        localStorage.removeItem('feedback');
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Добавьте отзыв',
            iconColor: '#ff5f5f',
            confirmButtonColor: '#cfcfcf',
            timer: 60000
        });
    }
}

function drawFeedback(book, author, contents, id) {
    const currentFeedback = document.createElement("li");
    currentFeedback.dataset.id = id;
    currentFeedback.textContent = `${book} (${author}): ${contents}`;

    const removeButton = document.createElement("span");
    removeButton.className = "remove-button";
    removeButton.textContent = "\u00D7";

    removeButton.addEventListener('click', () => {
        Swal.fire({
            title: 'Вы уверены?',
            text: 'Вы не сможете отменить это действие',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отменить',
            confirmButtonColor: '#cfcfcf',
            cancelButtonColor: '#cfcfcf',
            timer: 60000
        }).then((result) => {
            if (result.isConfirmed) {
                currentFeedback.style.display = "none";
                let oldFeedback = JSON.parse(localStorage.getItem("feedback"));
                let updatedFeedback = removeObjectById(oldFeedback, currentFeedback.dataset.id);
                localStorage.setItem("feedback", JSON.stringify(updatedFeedback));

                Swal.fire({
                    icon: 'success',
                    title: 'Успешно',
                    text: 'Отзыв удалён',
                    confirmButtonColor: '#cfcfcf',
                    timer: 60000
                });
            }
        });
    });

    currentFeedback.appendChild(removeButton);

    document.getElementById("feedback-list").appendChild(currentFeedback);
}

function removeObjectById(array, id) {
    const object = array.findIndex((item) => item.id === id);

    if (object > -1) {
        array.splice(object, 1);
    }

    return array;
}
