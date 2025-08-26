import type { ICounterService } from '@core/services/ICounterService';
import type { ICounterController } from './ICounterContoller';


export class CounterController implements ICounterController {
    constructor(private readonly service: ICounterService) { }

    async get() {
        const value = await this.service.getValue();
        return { value };
    }

    async inc(amount: number = 1) {
        const value = await this.service.increment(amount);
        return { value };
    }

    async dec(amount: number = 1) {
        const value = await this.service.decrement(amount);
        return { value };
    }
}