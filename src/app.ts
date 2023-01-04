import { ReferenceItem, UL, RefBook, Shelf } from './classes';
import { Author, Book, Librarian, Logger, TOptions, Magazine } from './interfaces';
import {
    bookTitleTransform,
    calcTotalPages,
    getObjectProperty,
    createCustomer,
    createCustomerID,
    getAllBooks,
    getBookAuthorByIndex,
    getBookByID,
    getBookTitlesByCategory,
    getProperty,
    getTitles,
    logBookTitles,
    logFirstAvailable,
    printBook,
    printRefBook,
    setDefaultConfig,
    сheckoutBooks,
    purge,
    getBooksByCategory,
    logCategorySearch,
    getBooksByCategoryPromise,
    logSearchResults,
} from './functions';
import { Category } from './enums';
import { BookRequiredFields, PersonBook, UpdatedBook, СreateCustomerFunctionType } from './types';
import { Library } from './classes/library';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ==============================================

// =================================================
// Task 02.01
// console.log(getAllBooks());
// console.log(logFirstAvailable(getAllBooks()));⁡
// console.log(logBookTitles(getBookTitlesByCategory(Category.JavaScript)));
// console.log(getBookAuthorByIndex(0));
// console.log(calcTotalPages());

// =================================================
// Task 03.01
// const myID: string = createCustomerID('Ann', 10);
// console.log(myID);

// let idGenerator: typeof createCustomerID;
// idGenerator = createCustomerID;
// console.log(idGenerator('Alex', 17));

// =================================================
// Task 03.02
// createCustomer('Alan');
// createCustomer('Alan', 31);
// createCustomer('Alan', 31, 'Lviv');
// console.log(logBookTitles(getBookTitlesByCategory()));
// console.log(logFirstAvailable());
// console.log(getBookByID(1));
// const myBooks = сheckoutBooks('Ann', ...[1, 2, 4]);
// console.log(myBooks);

// =================================================
// Task 03.03
// console.log(getTitles(1, true));
// const checkedOutBooks: string[] = getTitles(false);
// console.log(checkedOutBooks);

// =================================================
// Task 03.04
// console.log(bookTitleTransform('Mastering JavaScript Object-Oriented Programming'));
// console.log(bookTitleTransform([]));

// =================================================
// Task 04.01
// const myBook = {
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS,
//     pages: 200,
//     markDamaged: (reason: string) => console.log(`Damaged: ${reason}`),
// };
// printBook(myBook);
// myBook.markDamaged('missing back cover');

// =================================================
// Task 04.02
// const logDamage: Logger = (reason: string) => console.log(`Damaged: ${reason}`);
// logDamage('missing back cover');

// =================================================
// Task 04.03
// const favoriteAuthor: Author = { name: 'Bill', email: 'bill@example.com', numBooksPublished: 3 };
// const favoriteLibrarian: Librarian = {
//     name: 'Kail',
//     email: 'kail@example.com',
//     department: 'Classical Literature',
//     assistCustomer: null,
// };

// =================================================
// Task 04.04
// const offer: any = {
//     book: {
//         title: 'Essential TypeScript',
//     },
// };
// console.log(offer.magazine);
// console.log(offer.magazine?.getTitle());
// console.log(offer.book.getTitle?.());
// console.log(offer.book.authors?.[0]);

// =================================================
// Task 04.05
// console.log(getProperty(myBook, 'title'));
// console.log(getProperty(myBook, 'markDamaged'));
// console.log(getProperty(myBook, 'isbn'));

// =================================================
// Task 05.01
// const ref = new ReferenceItem(1, 'Lern TypeScript', 2022);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'abc group';
// console.log(ref.publisher);
// console.log(ref.getId());

// =================================================
// Task 05.02-05.03
// const refBook: RefBook = new RefBook(1, 'Lern TypeScript', 2022, 2);
// refBook.printItem();
// refBook.printCitation();

// =================================================
// Task 05.04
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris', 'Lern Type Script');

// =================================================
// Task 05.05
// const personBook: PersonBook = {
//     id: 3,
//     title: 'Unknown',
//     name: 'Anna',
//     author: 'Ann',
//     available: true,
//     email: 'ann@example.com',
//     category: Category.Angular,
// };
// const options: TOptions = { duration: 20 };
// setDefaultConfig(options);
// console.log(options);

// =================================================
// Task 06.03
// const refBook: RefBook = new RefBook(1, 'Lern TypeScript', 2022, 2);
// printRefBook(refBook);
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// printRefBook(favoriteLibrarian);

// =================================================
// Task 06.05
// const flag = true;
// if (flag) {
//     import('./classes')
//         .then(c => {
//             const reader = new c.Reader();
//             reader.name = 'Ann';
//             reader.take(getAllBooks()[1]);
//             console.log(reader);
//         })
//         .catch(err => console.log(err))
//         .finally(() => console.log('Complete!'));
// }

// if (flag) {
//     const c = await import('./classes');
//     const reader = new c.Reader();
//     reader.name = 'Ann';
//     reader.take(getAllBooks()[1]);
//     console.log(reader);
// }

// =================================================
// Task 06.06
// let library: Library = {
//     id: 1,
//     address: '',
//     name: 'Ann',
// };
// console.log(library);

// =================================================
// Task 07.01
// const inventory: Book[] = [
//     { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
//     { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
//     { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
//     { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
// ];

// console.log(purge(inventory));
// console.log(purge([1, 2, 3, 4, 5, 6]));

// =================================================
// Task 07.02 - 07.03
// const bookShelf: Shelf<Book> = new Shelf<Book>();
// const bookShelf = new Shelf<Book>();
// inventory.forEach(book => {
//     bookShelf.add(book);
// });
// console.log(bookShelf.getFirst()?.title);

// const magazines: Magazine[] = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' },
// ];

// const magazineShelf = new Shelf<Magazine>();
// magazines.forEach(mag => {
//     magazineShelf.add(mag);
// });
// console.log(magazineShelf.getFirst()?.title);
// magazineShelf.printTitles();
// console.log(magazineShelf.find('Five Points'));
// console.log(getObjectProperty(magazines[0], 'title'));
// console.log(getObjectProperty(inventory[0], 'title'));

// =================================================
// Task 07.04
// const bookRequiredFields: BookRequiredFields = {
//     author: 'Ann',
//     available: true,
//     category: Category.JavaScript,
//     id: 1,
//     title: 'Learn JavaScript',
//     pages: 200,
//     markDamaged: null,
// };

// const updatedBook: UpdatedBook = {
//     pages: 100,
//     id: 3,
// };
// let params: Parameters<СreateCustomerFunctionType>;
// params = ['Ann', 30, 'Keiv'];
// createCustomer(...params);

// =================================================
// Task 08.01-08-02

// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// favoriteLibrarian['a'] = 1;
// UL.UniversityLibrarian['a'] = 2;

// console.log(favoriteLibrarian);
// favoriteLibrarian.name = 'Ann';
// favoriteLibrarian['printLibrarian']();

// =================================================
// Task 08.03
// const favoriteLibrarian = new UL.UniversityLibrarian();
// console.log(favoriteLibrarian);
// favoriteLibrarian.assistFaculty = null;
// favoriteLibrarian.teachCommunity = null;

// =================================================
// Task 08.03
// const refBook: RefBook = new RefBook(1, 'Lern TypeScript', 2022, 2);
// refBook.printItem();

// =================================================
// Task 08.05
// const favoriteLibrarian = new UL.UniversityLibrarian();
// console.log(favoriteLibrarian);
// favoriteLibrarian.name = 'Ann';
// favoriteLibrarian.assistCustomer('Bill', 'LernTypeScript');

// =================================================
// Task 08.06
// const favoriteLibrarian = new UL.UniversityLibrarian();
// favoriteLibrarian.name = 'Ann';
// console.log(favoriteLibrarian.name);
// favoriteLibrarian.assistCustomer('Bill', 'LernTypeScript');

// =================================================
// Task 08.07
// const refBook: RefBook = new RefBook(1, 'Lern TypeScript', 2022, 2);
// refBook.copies = 10;
// refBook.copies = 4.5;
// console.log(refBook.copies);

// =================================================
// Task 09.01
// console.log('Begin');
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// getBooksByCategory(Category.Software, logCategorySearch);
// console.log('End');

// =================================================
// Task 09.02
// console.log('Begin');
// getBooksByCategoryPromise(Category.JavaScript)
//     .then(data => {
//         console.log(data);
//         return data.length;
//     })
//     .then(n => console.log(n))
//     .catch(e => console.log(e));

// getBooksByCategoryPromise(Category.Software)
//     .then(data => {
//         console.log(data);
//     })
//     .catch(e => console.log(e));

// console.log('End');

// =================================================
// Task 09.03
// console.log('Begin');
// logSearchResults(Category.JavaScript);
// logSearchResults(Category.Software).catch(e => console.log(e));
// console.log('End');
