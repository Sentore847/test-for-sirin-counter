import readline from 'readline';
import type { ITransport } from '@transport/ITransport';
import type { ICounterController } from '@app/controllers/ICounterContoller';


export class CliApp implements ITransport {
    private rl?: readline.Interface;

    constructor(private readonly appName: string, private readonly controller: ICounterController) { }

    async start(): Promise<void> {
        this.rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: `${this.appName}> ` });

        this.rl.on('line', async (line) => {
            const [cmd, arg] = line.trim().split(/\s+/);
            try {
                switch (cmd) {
                    case 'get':
                        console.log((await this.controller.get()).value);
                        break;
                    case 'inc':
                        console.log((await this.controller.inc(Number(arg) || 1)).value);
                        break;
                    case 'dec':
                        console.log((await this.controller.dec(Number(arg) || 1)).value);
                        break;
                    case 'help':
                        console.log('Commands: get | inc [n] | dec [n] | exit');
                        break;
                    case 'exit':
                        this.rl?.close();
                        break;
                    default:
                        console.log('Unknown command. Type `help`.');
                }
            } catch (e) {
                console.error('Error:', (e as Error).message);
            }
            this.rl?.prompt();
        });

        this.rl.prompt();
    }

    async stop(): Promise<void> {
        this.rl?.close();
    }
}