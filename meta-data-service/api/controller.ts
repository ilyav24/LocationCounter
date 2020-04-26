import express from 'express';

abstract class Controller {
  public router = express.Router();
  abstract intializeRoutes(): void;
}

export default Controller;
