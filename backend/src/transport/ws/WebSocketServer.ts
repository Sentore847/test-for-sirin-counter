import { WebSocketServer, WebSocket } from 'ws';
import type { ITransport } from '@transport/ITransport';
import type { ICounterController } from '@app/controllers/ICounterContoller';

interface WsMessage {
    type: string;
    amount?: number;
}

interface WsResponse {
    value?: number;
    error?: string;
}

export class WsClient {
    constructor(private readonly ws: WebSocket) { }

    send(response: WsResponse): void {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(response));
        }
    }

    sendSuccess(data: WsResponse): void {
        this.send(data);
    }

    sendError(message: string): void {
        this.send({ error: message });
    }
}

export class WsServer implements ITransport {
    private wss?: WebSocketServer;

    constructor(
        private readonly port: number,
        private readonly controller: ICounterController
    ) { }

    async start(): Promise<void> {
        this.wss = new WebSocketServer({ port: this.port });
        this.wss.on('connection', this.onConnection.bind(this));
        console.info(`[WS] listening on ws://localhost:${this.port}`);
    }

    async stop(): Promise<void> {
        if (!this.wss) return;
        await this.closeServer();
        console.info('[WS] stopped');
    }

    private onConnection(ws: WebSocket): void {
        const client = new WsClient(ws);

        ws.on('message', async (raw) => {
            try {
                const message = JSON.parse(raw.toString());
                const response = await this.handleMessage(message);
                client.sendSuccess(response);
            } catch (error) {
                client.sendError((error as Error).message);
            }
        });

        ws.on('error', (error) => {
            console.error('[WS] Client error:', error.message);
        });
    }

    private async handleMessage(message: WsMessage): Promise<WsResponse> {
        const { type, amount } = message;
        const safeAmount = this.ensureFiniteNumber(amount, 1);

        switch (type) {
            case 'get':
                return await this.controller.get();

            case 'inc':
                return await this.controller.inc(safeAmount);

            case 'dec':
                return await this.controller.dec(safeAmount);

            default:
                throw new Error(`Unknown message type: ${type}`);
        }
    }

    private ensureFiniteNumber(value: number | undefined, fallback: number): number {
        return Number.isFinite(value) ? value! : fallback;
    }

    private closeServer(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.wss?.close(() => resolve());
        });
    }
}