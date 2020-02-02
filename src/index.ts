import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Environment, Env } from "roit-environment"
import { modelMapperMiddleware } from '@roit/roit-model-mapper';
import { Handle } from '@roit/roit-response-handler';
import * as cors from "cors"
import { ExampleApi } from './api/v1/ExampleApi';

export class App extends Server {

    constructor() {
        super(Environment.acceptedEnv(Env.DEV)); // setting showLogs to true
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(modelMapperMiddleware)
        this.app.use(cors({origin: true}));


        this.setupControllers();

        this.app.use(Handle.middleware)
    }

    private setupControllers(): void {
        super.addControllers([ new ExampleApi ]);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp('Server listening on port: ' + port);
        })
    }
}

const port = process.env.PORT || Number(Environment.getProperty("port"));

new App().start(Number(port))