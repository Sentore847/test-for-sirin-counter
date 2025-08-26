import http, { IncomingMessage, ServerResponse } from 'http';
import type { ITransport } from '@transport/ITransport';
import type { ICounterController } from '@app/controllers/ICounterContoller';

type RequestHandler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

class RouteBuilder {
    private routes: Map<string, RequestHandler> = new Map();

    get(path: string, handler: RequestHandler): this {
        this.routes.set(`GET:${path}`, handler);
        return this;
    }

    post(path: string, handler: RequestHandler): this {
        this.routes.set(`POST:${path}`, handler);
        return this;
    }

    find(method: string, path: string): RequestHandler | undefined {
        return this.routes.get(`${method}:${path}`);
    }
}

export class HttpServer implements ITransport {
    private server?: http.Server;
    private router: RouteBuilder;

    constructor(
        private readonly port: number,
        private readonly controller: ICounterController
    ) {
        this.router = this.setupRoutes();
    }

    private setupRoutes(): RouteBuilder {
        return new RouteBuilder()
            .get('/counter', async (_req, res) => {
                const value = await this.controller.get();
                this.ok(res, { value });
            })
            .post('/counter/increment', async (_req, res) => {
                const value = await this.controller.inc(1);
                this.ok(res, { value });
            })
            .post('/counter/decrement', async (_req, res) => {
                const value = await this.controller.dec(1);
                this.ok(res, { value });
            });
    }

    async start(): Promise<void> {
        this.server = http.createServer(async (req, res) => {
            try {
                await this.handleRequest(req, res);
            } catch (err) {
                this.error(res, 500, (err as Error).message);
            }
        });

        await this.listen();
        console.info(`[HTTP] listening on http://localhost:${this.port}`);
    }

    async stop(): Promise<void> {
        if (!this.server) return;
        await this.close();
        console.info('[HTTP] stopped');
    }

    private async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const method = req.method ?? '';
        const url = req.url ?? '/';
        const pathname = new URL(url, `http://${req.headers.host}`).pathname;

        if (method === 'OPTIONS') {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            });
            res.end();
            return;
        }

        const handler = this.router.find(method, pathname);
        if (!handler) {
            return this.error(res, 404, 'Not Found');
        }

        await handler(req, res);
    }

    private listen(): Promise<void> {
        return new Promise((resolve) => this.server!.listen(this.port, resolve));
    }

    private close(): Promise<void> {
        return new Promise((resolve, reject) =>
            this.server!.close((err) => (err ? reject(err) : resolve()))
        );
    }

    private ok(res: ServerResponse, data: unknown): void {
        this.json(res, 200, data);
    }

    private error(res: ServerResponse, status: number, message: string): void {
        this.json(res, status, { error: message });
    }

    private json(res: ServerResponse, status: number, payload: unknown): void {
        const data = Buffer.from(JSON.stringify(payload));
        res.writeHead(status, {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });
        res.end(data);
    }
}
