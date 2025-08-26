import type { ICounterRepository } from '@core/repositories/ICounterRepository';
import type { ICounterService } from './ICounterService';

export class CounterService implements ICounterService {
    constructor(private readonly repo: ICounterRepository) { }


    async getValue(): Promise<number> {
        const c = await this.repo.load();
        return c.value;
    }


    async increment(by: number = 1): Promise<number> {
        const c = await this.repo.load();
        c.increment(by);
        await this.repo.save(c);
        return c.value;
    }


    async decrement(by: number = 1): Promise<number> {
        const c = await this.repo.load();
        c.decrement(by);
        await this.repo.save(c);
        return c.value;
    }
}