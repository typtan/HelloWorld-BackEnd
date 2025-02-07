import express from "express";
import * as roomController from "../controllers/roomController.js"

const roomRoute = express.Router();

roomRoute.get("/", roomController.getAllRoom);
roomRoute.get("/available", roomController.getBookingฺByDay);
roomRoute.put("/", roomController.updateRoomStatus);

export default roomRoute;