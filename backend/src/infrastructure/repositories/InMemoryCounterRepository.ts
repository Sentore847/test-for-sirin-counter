import { Counter } from "@core/entities/Counter";
import type { ICounterRepository } from '@core/repositories/ICounterRepository';

export class InMemoryCounterRepository implements ICounterRepository {
    private counter: Counter;

    constructor(initial: number = 0) {
        this.counter = new Counter(initial);
    }

    async load(): Promise<Counter> {
        return this.counter;
    }

    async save(counter: Counter): Promise<void> {
        this.counter = counter;
    }
}