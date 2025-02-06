import express from "express"
import * as currentController from '../controllers/currentController.js'

const currentRoute = express.Router();

currentRoute.get("/", currentController.getCurrentRoom);

export default currentRoute;