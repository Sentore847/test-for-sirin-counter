import dotenv from 'dotenv';

dotenv.config();

export class Config {
    readonly httpPort: number;
    readonly wsPort: number;
    readonly appName: string;
    readonly counterInitial: number;

    constructor(env: NodeJS.ProcessEnv = process.env) {
        this.httpPort = this.number(env.HTTP_PORT, 3000);
        this.wsPort = this.number(env.WS_PORT, 3001);
        this.appName = env.APP_NAME?.trim() || 'Counter';
        this.counterInitial = this.number(env.COUNTER_INITIAL, 0);
    }

    private number(value: string | undefined, fallback: number): number {
        const n = Number(value);
        return Number.isFinite(n) ? n : fallback;
    }
}