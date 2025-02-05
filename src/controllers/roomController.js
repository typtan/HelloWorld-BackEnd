import * as Room from "../models/roomModel";

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
            message: "Server error"
        });
    }
};

export const updateRoomStatus = async (req, res) => { 
    const { id } = req.params;
    const { status } = req.body;

    try {
        const room = await Room.updateRoomStatus(id, status);

        if (!room || room.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        await Room.updateRoomStatus(id, status);

        res.json({
            success: true,
            message: `Room status updated to ${status}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};