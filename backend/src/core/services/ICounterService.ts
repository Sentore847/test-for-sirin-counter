export interface ICounterService {
    getValue(): Promise<number>;
    increment(by?: number): Promise<number>;
    decrement(by?: number): Promise<number>;
}