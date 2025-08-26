export class Counter {

    #value: number;

    constructor(initial: number = 0) {
        if (!Number.isFinite(initial)) throw new Error('Initial value must be a finite number');
        this.#value = initial;
    }

    get value(): number {
        return this.#value;
    }

    increment(by: number = 1): number {
        this.ensureNumber(by);
        this.#value += by;
        return this.#value;
    }

    decrement(by: number = 1): number {
        this.ensureNumber(by);
        this.#value -= by;
        return this.#value;
    }

    private ensureNumber(n: number): void {
        if (!Number.isFinite(n)) throw new Error('Amount must be a finite number');
    }
}