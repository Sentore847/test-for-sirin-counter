import type { Counter } from "@core/entities/Counter";

export interface ICounterRepository {
    load(): Promise<Counter>;
    save(counter: Counter): Promise<void>;
}