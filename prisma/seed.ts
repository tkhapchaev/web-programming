import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const bookData = [
    { title: "Пикник на обочине", author: "Аркадий и Борис Стругацкие", price: 291, coverImage: "images/books/picnic-na-obochine.jpeg" },
    { title: "Мы", author: "Евгений Иванович Замятин", price: 405, coverImage: "images/books/mi.jpeg" },
    { title: "Повелитель мух", author: "Уильям Голдинг", price: 246, coverImage: "images/books/povelitel-muh.jpeg" },
    { title: "Портрет Дориана Грея", author: "Оскар Уайльд", price: 373, coverImage: "images/books/portret-doriana-graya.jpeg" },
    { title: "Поющие в терновнике", author: "Колин Маккалоу", price: 282, coverImage: "images/books/poushie-v-ternovnike.jpeg" },
    { title: "Преступление и наказание", author: "Фёдор Михайлович Достоевский", price: 287, coverImage: "images/books/prestuplenie-i-nakazanie.jpeg" },
    { title: "Мастер и Маргарита", author: "Михаил Афанасьевич Булгаков", price: 342, coverImage: "images/books/master-i-margarita.jpeg" },
    { title: "Отцы и дети", author: "Иван Сергеевич Тургенев", price: 296, coverImage: "images/books/otci-i-deti.jpeg" },
    { title: "Спеши любить", author: "Николас Спаркс", price: 371, coverImage: "images/books/speshi-lubit.jpeg" },
    { title: "Вишнёвый сад", author: "Антон Павлович Чехов", price: 344, coverImage: "images/books/vishneviy-sad.jpeg" },
    { title: "Анна Каренина", author: "Лев Николаевич Толстой", price: 327, coverImage: "images/books/anna-karenina.jpeg" },
    { title: "Бойцовский клуб", author: "Чак Паланик", price: 237, coverImage: "images/books/boycovskiy-club.jpeg" },
    { title: "Идиот", author: "Фёдор Михайлович Достоевский", price: 249, coverImage: "images/books/idiot.jpeg" },
    { title: "Маленький принц", author: "Антуан де Сент-Экзюпери", price: 351, coverImage: "images/books/malenkiy-princ.jpeg" },
    { title: "Мартин Иден", author: "Джек Лондон", price: 250, coverImage: "images/books/martin-iden.jpeg" },
    { title: "Три товарища", author: "Эрих Мария Ремарк", price: 230, coverImage: "images/books/tri-tovarisha.jpeg" },
    { title: "Пиковая дама", author: "Александр Сергеевич Пушкин", price: 392, coverImage: "images/books/pikovaya-dama.jpeg" }
];

async function main() {
    console.log(`Start seeding ...`);
    for (const book of bookData) {
        const bookRecord = await prisma.book.create({
            data: book,
        });
        console.log(`Created book with title: ${bookRecord.title}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
