export default interface ITransport {
    get(): Promise<number>;
    increment(): Promise<number>;
    decrement(): Promise<number>;
    subscribe?(cb: (value: number) => void): void;
}
