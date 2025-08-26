export interface ICounterController {
    get(): Promise<{ value: number }>;
    inc(amount?: number): Promise<{ value: number }>;
    dec(amount?: number): Promise<{ value: number }>;
}