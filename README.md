# Web-программирование
## Хапчаев Тимур Русланович M33071
Книжный интернет-магазин "Читай.ru"

https://online-bookstore-zirf.onrender.com
<br><br>
![erd](https://github.com/is-web-y25/m33071-khapchaev/assets/89847233/6c673e21-57ba-4ead-baa6-44e6ea96b187)

User : Пользователь
- id (идентификатор)
- email (электронная почта)
- password (пароль)
- createdAt (время создания)
- updatedAt (время обновления)
- auth0Id (идентификатор auth0)

Book : Книга
- id (идентификатор)
- title (название)
- author (автор)
- price (цена)
- coverImage (обложка)
- createdAt (время создания)
- updatedAt (время обновления)
- isNewRelease (является ли книга новинкой)
- weeklyTop (является ли книга хитом последней недели)

Review : Отзыв
- id (идентификатор)
- bookId (id книги, на которую написан отзыв)
- content (содержание, то есть сам отзыв)
- createdAt (время создания)
- userId (идентификатор пользователя, оставившего отзыв)

Order : Заказ
- id (идентификатор)
- userId (идентификатор пользователя, оформившего заказ)
- createdAt (время создания)
- updatedAt (время обновления)
- items (книги, входящие в заказ)
