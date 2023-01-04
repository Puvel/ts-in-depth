/* eslint-disable no-underscore-dangle */
import { ReferenceItem } from '../classes';
import { positiveInteger } from '../decorators';

export default class Encyclopedia extends ReferenceItem {
    private _copies: number;

    @positiveInteger
    get copies(): number {
        return this._copies;
    }

    set copies(val: number) {
        this._copies = val;
    }

    constructor(id: number, title: string, year: number, public edition: number) {
        super(id, title, year);
    }

    override printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year}) `);
    };

    printCitation(): void {
        console.log(`${this.title} – ${this.year}`);
    }
}