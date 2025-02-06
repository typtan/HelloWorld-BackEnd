import express from "express"
import * as bookingController from '../controllers/bookingController.js'

const bookingRoute = express.Router();

bookingRoute.get("/", bookingController.getBooking);
bookingRoute.get("/:bookId", bookingController.getBookingById);
bookingRoute.post("/", bookingController.addBooking);
bookingRoute.patch("/:bookId", bookingController.updateBooking);
bookingRoute.delete("/:bookId", bookingController.deleteBooking);

export default bookingRoute;