import * as currentModel from '../models/currentModel.js'

export const getCurrentRoom = async(req,res) => {
    try {
        const roomBookNow = await currentModel.getCurrentRoom();
        return res.status(200).json({
            success: true,
            roomBookNow,
            message: "Room booked show successfully"
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ //ส่งข้อมูลกลับแบบ json
            success: false,
            data: null,
            message: "Internal server error"
        });
    }
}