/* eslint-disable no-redeclare */

import { Category } from './enums';
import { Book, Callback, LibMgrCallback, TOptions } from './interfaces';
import { BookOrUndefined, BookProperties } from './types';
import RefBook from './classes/encyclopedia';

export function getAllBooks(): readonly Book[] {
    const books = <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            category: Category.JavaScript,
            author: 'Evan Burchard',
            available: true,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            category: Category.JavaScript,
            author: 'Liang Yuxian Eugene',
            available: false,
        },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            category: Category.JavaScript,
            available: true,
        },
    ];

    return books;
}

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    const firstAvailableBook = books.find(({ available }) => available);
    const bookNotification = firstAvailableBook
        ? `First available book "${firstAvailableBook.title}"`
        : 'No books available!';

    console.log(`Number of books ${books.length}`);
    console.log(bookNotification);
}

export function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
    const books = getAllBooks();

    return books.filter(({ category }) => category === inputCategory).map(({ title }) => title);
}

export function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

export function getBookAuthorByIndex(idx: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[idx];

    return [title, author];
}

export function calcTotalPages(): bigint {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    return data.reduce((total: bigint, obj) => {
        return total + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);
}

export function createCustomerID(name: string, id: number): string {
    return `${name}_${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);
    if (age) {
        console.log(`Customer age: ${age}`);
    }
    if (city) {
        console.log(`Customer city: ${city}`);
    }
}

export function getBookByID(id: Book['id']): BookOrUndefined {
    return getAllBooks().find(book => book.id === id);
}

export function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer name: ${customer}`);

    return bookIDs
        .map(id => getBookByID(id))
        .filter(({ available }) => available)
        .map(({ title }) => title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
    const books = getAllBooks();
    if (args.length === 1) {
        const [arg] = args;
        if (typeof arg === 'string') {
            return books.filter(({ author }) => author === arg).map(({ title }) => title);
        } else if (typeof arg === 'boolean') {
            return books.filter(({ available }) => available === arg).map(({ title }) => title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;
        return books.filter(book => book.id === id && book.available === available).map(({ title }) => title);
    }
}

export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not an instance of RefBook');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function getProperty(book: Book, prop: BookProperties): any {
    const val = book[prop];
    return typeof val === 'function' ? val.name : val;
}

export function getObjectProperty<TObject, TKey extends keyof TObject>(
    obj: TObject,
    prop: TKey,
): TObject[TKey] | string {
    const val = obj[prop];
    return typeof val === 'function' ? val.name : val;
}

export function setDefaultConfig(options: TOptions) {
    options.duration ??= 100;
    options.speed ??= 60;
    return options;
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function purge<T>(inventory: T[]): Array<T> {
    inventory.splice(0, 2);
    return inventory;
}
export function getBooksByCategory(category: Category, callback: Callback<string[]>): void {
    // export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found!');
            }
        } catch (err) {
            callback(err, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[] | null): void {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    const p: Promise<string[]> = new Promise((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No books found!');
            }
        }, 2000);
    });
    return p;
}

export async function logSearchResults(category: Category) {
    const titles = await getBooksByCategoryPromise(category);
    return titles;
}
