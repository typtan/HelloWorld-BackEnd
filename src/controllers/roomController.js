import * as Room from "../models/roomModel.js";

export const getAllRoom = async (req, res) => {
    try {
        const rooms = await Room.getAllRoom();

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            data: rooms,
            message: "Successfully fetched all rooms"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error fetched all rooms"
        });
    }
};

export const getBookingฺByDay = async (req, res) => {
    const { roomId } = req.body;
    const {bookDate} = req.body;
    try {
        if(!roomId){
            return res.status(400).json({
                success: false,
                data: null,
                message: "Booking Date is required"
            });
        }
        const rows = await Room.getBookingฺByDay(roomId, bookDate);
        if (rows.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: `No bookings found for ${roomId}`
            });
        }
        return res.status(200).json({
            success: true,
            data: rows,
            message: `Bookings retrieved successfully for ${roomId}`
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            data: null,
            message: "An error occurred while retrieving bookings. Please try again later"
        });
    }
};

export const updateRoomStatus = async (req, res) => { 
    const { id, status } = req.body;
        if (!id || !status) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "ID and Status is required"
            })
    } 
    try {
        const room = await Room.getRoomById(id);
        if (!room || room.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        await Room.updateRoomStatus(id, status);
        return res.json({
            success: true,
            message: `Room status updated to ${status}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const addRoom = async (req, res) => { 
    const { id, status } = req.body;
        if (!id || !status) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "ID and Status is required"
            })
    } 
    try {
        const roomId = await roomModel.addRoom(roomName, roomDescription, capacity);
        return res.status(201).json({
            success: true,
            message: "Room added successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error adding room"
        });
    }
};