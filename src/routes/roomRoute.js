import express from "express";
import * as roomController from "../controllers/roomController.js"

const roomRoute = express.Router();

roomRoute.get("/", roomController.getAllRoom);
roomRoute.put("/", roomController.updateRoomStatus);


export default roomRoute;