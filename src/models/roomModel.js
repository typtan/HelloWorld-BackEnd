import db from "../config/database.js";

export const getAllRoom = async (room_id,room_status) => {
    const [response] = await db.promise().query(
    `SELECT * 
    FROM floorX;`)
    return response;
}

export const updateRoomStatus = async (room_id, room_status) => {
    const [response] = await db.promise().query(
    `UPDATE floorX 
    SET room_open = ? 
    WHERE room_id = ?;`, [room_status, room_id])
    return response;
};
