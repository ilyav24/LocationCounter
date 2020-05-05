import { Location } from './../models/location';
import { Response } from 'express';
import { Request } from 'express';
import express from 'express';
import { param, check, validationResult } from 'express-validator';
import Controller from './controller';

class LoginController extends Controller {
  public path = '/location';
  public idPrefix: string = '/:id';
  public router = express.Router();

  constructor() {
    super()
    this.intializeRoutes();
  }

  public intializeRoutes() {

}
