import * as bookingModel from '../models/bookingModel.js'
import * as currentModel from '../models/currentModel.js'

export const getBooking = async(req, res) => {
    try {
        const booking = await bookingModel.getBooking();
        return res.status(200).json({ 
            success: true,
            data: booking,
            message: "Booking retrieved successfully"
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error"
        });
    }
}

export const getBookingById = async(req, res) => {
    try {
        const { bookId } = req.params;
        if(!bookId){
            return res.status(400).json({
                success: false,
                data: null,
                message: "Book ID is required"
            });
        }
        
        const booking = await bookingModel.getBookingById(bookId);
        if(!booking || booking.length === 0){
            return res.status(403).json({
                success: false,
                data: null,
                message: "Booking not found"
            });
        }
        return res.status(200).json({ 
            success: true,
            data: booking,
            message: "Booking retrieved successfully"
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error"
        });
    }
}

function BookingAvailable() {
    const currentTime = new Date();
    
    const currentHour = currentTime.getHours(); 
    const currentMinute = currentTime.getMinutes();
  
    const startHour = 8;  
    const endHour = 20;    
    
    if (currentHour >= startHour && currentHour < endHour) {
      if (currentHour === endHour && currentMinute > 0) {
        console.log("Booking time is over");
        return false; 
      } else {
        console.log("Booking is available");
        return true; 
      }
    } else {
      console.log("Booking time is over");
      return false; 
    }
  }

export const addBooking = async (req, res) => {
    const { roomId, staffId, fname, lname, descri, startT, endT } = req.body;

    // Validate input
    if (!roomId || !staffId || !fname || !lname || !startT || !endT) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Booking data is required"
        });
    }

    // Validate time
    const startTime = new Date(startT);
    const endTime = new Date(endT);
    if (isNaN(startTime) || isNaN(endTime)) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Invalid date format"
        });
    }
    if (startTime >= endTime) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "startTime must be before endTime"
        });
    }

    try {
        const bookId = await bookingModel.addBooking(roomId, staffId, fname, lname, startT, endT);

        await currentModel.addCurrentRoom(roomId, bookId, startT, endT) //insert to current_room table

        return res.status(201).json({
            success: true,
            bookId,  //Return bookId
            message: "Booking added successfully"
        });
    } catch (error) {
        console.error("Error adding booking:", error);
        
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                data: null,
                message: "Duplicate booking entry"
            });
        }
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error"
        });
    }
};

export const updateBooking = async(req,res) => {
    const { bookId } = req.params;
    const { roomId, staffId, fname, lname, startT, endT } = req.body;
    if (!bookId) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "BookID is required"
        });
    }
    
    const updateFields = {};
    if (roomId) updateFields.room_id = roomId;
    if (staffId) updateFields.staff_id = staffId;
    if (fname) updateFields.fname = fname;
    if (lname) updateFields.lname = lname;
    if (startT) updateFields.start_time = startT;
    if (endT) updateFields.end_time = endT;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "At least one update field is required"
        });
    }
    
    try {
        await bookingModel.updateBooking(bookId, roomId, staffId, fname, lname, startT, endT);
        return res.status(200).json({
            success: true,
            data: null,
            message: "Booking data updated successfully"
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error"
        });
    }
}


export const deleteBooking = async(req,res) => {
    const {bookId} = req.params;
    if(!bookId){
        return res.status(400).json({
            success: false,
            data: null,
            message: "BookID is required"
        });
    }
    try {
        await bookingModel.deleteBooking(bookId);
        return res.status(201).json({
            success: true,
            data: null,
            message: "Booking data deleted successfully"
        })
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ 
            success: false,
            data: null,
            message: "Internal server error"
        });
    }
}

BookingAvailable();