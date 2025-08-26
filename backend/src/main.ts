import { Config } from './config/Config';
import { CounterService } from '@core/services/CounterService';
import { InMemoryCounterRepository } from '@infrastructure/repositories/InMemoryCounterRepository';
import { CounterController } from '@app/controllers/CounterController';
import type { ITransport } from '@transport/ITransport';
import { HttpServer } from '@transport/http/HttpsServer';
import { WsServer } from '@transport/ws/WebSocketServer';
import { CliApp } from '@transport/cli/CliApp';

async function bootstrap(): Promise<void> {
    const cfg = new Config();

    const repo = new InMemoryCounterRepository(cfg.counterInitial);
    const service = new CounterService(repo);
    const controller = new CounterController(service);

    const mode = (process.argv[2] || 'http').toLowerCase();
    let transport: ITransport;

    switch (mode) {
        case 'http':
            transport = new HttpServer(cfg.httpPort, controller);
            break;
        case 'ws':
            transport = new WsServer(cfg.wsPort, controller);
            break;
        case 'cli':
            transport = new CliApp(cfg.appName, controller);
            break;
        default:
            throw new Error(`Unknown mode: ${mode}`);
    }

    await transport.start();
}

bootstrap().catch((e) => {
    console.error(e);
    process.exit(1);
});
