import express from 'express';

abstract class Controller {
  public router = express.Router();
  abstract initializeRoutes(): void;
}

export default Controller;
