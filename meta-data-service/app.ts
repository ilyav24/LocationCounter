import express, { Response, Request } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;

    // this is plaster because the server returns 304 instead of 200
    // to fix this change all the controller PATCH request to be an PUT request
    this.app.disable('etag')
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.get('/', (req: Request, res: Response): void => {
      res.send("I'm up and running!");
    });

    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
