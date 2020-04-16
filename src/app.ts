// global
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
// local
import { Logger, LoggerInterface } from './lib/logger';
import InitializeRoutes from './routes';
import config from './config';
// middlewares
import nodeErrorHandler from './middleware/node-error.handler';
import notFoundHandler from './middleware/not-found.handler';
import ignoreFavicon from './middleware/ignore-favicon.handler';    

class Application {

    public app: express.Application;
    private logger: LoggerInterface;
    private config: any;

    constructor() {
        this.logger = new Logger();
        this.app = express();
        this.config = config;

        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev', { skip: (() => process.env.NODE_ENV === 'test') }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(ignoreFavicon);

        this.app.use(express.static(`${__dirname}/public`));

        InitializeRoutes(this.app);

        this.app.use(notFoundHandler);

    }

    public startServer(): Promise<boolean> {
        console.log(process.env);
        
        return new Promise(resolve => {
            this.app.listen(process.env.PORT || 8080, () => {
                this.logger.info(`Server started at http://${this.config.host}:${this.config.port}`);
                resolve(true);
            }).on('error', nodeErrorHandler);
        });
    }

}

export default Application;