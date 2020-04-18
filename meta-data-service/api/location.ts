import { Response } from "express";
import { Request } from "express";
import express from "express";

class LocationController {
  public path = "/location";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getLocations);
  }

  getLocations = (req: Request, res: Response) => {
    res.send("hello world");
  };
}

export default LocationController;
