import express from 'express';
import dotenv from 'dotenv';
import * as http from 'http';
import * as bodyparser from 'body-parser';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';

import { BaseRoute } from './common/base.routes.config';
import { EnergyConsumptionRoute } from './energyconsumption/consumption.route.config';

import debug from 'debug';

const app: express.Application = express();
dotenv.config();

const server: http.Server = http.createServer(app);
const routes: Array<BaseRoute> = [];
const debugLog: debug.IDebugger = debug('app');

// Adding middleware to parse all incoming requests as JSON 
app.use(bodyparser.json());

// Adding middleware to allow cross-origin requests
app.use(cors());

// Configuring the expressWinston logging middleware,
// which will automatically log all HTTP requests handled by Express.js
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

// Add all routes to the route array.
routes.push(new EnergyConsumptionRoute(app));

// Configuring the expressWinston error-logging middleware for logging errors.
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server up and running!`)
});

server.listen(process.env.PORT || 3000, () => {
    debugLog(`Server running at http://localhost:${process.env.PORT || 3000}`);
    routes.forEach((route: BaseRoute) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});
