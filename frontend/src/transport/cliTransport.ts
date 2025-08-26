import type ITransport from "./ITransport";

let value = 0;

export const cliTransport: ITransport = {
    async get() {
        return value;
    },
    async increment() {
        value += 1;
        return value;
    },
    async decrement() {
        value -= 1;
        return value;
    }
};
