import db from "../config/database.js";

export const getAllRoom = async () => {
    const [response] = await db.promise().query(
    `SELECT * 
    FROM roomList;`)
    return response;
}

export const getRoomById = async (room_id) => {
    const [response] = await db.promise().query(
    `SELECT * 
    FROM roomList
    WHERE room_id = ?;`, [room_id])
    return response[0];
}


export const getBookingฺByDay = async(roomId, bookDate) => {
    const [response] = await db.promise().query(
    `SELECT fname, lname, room_id, start_time, end_time
    FROM floor11LX_bookings
    WHERE room_id = ? AND DATE(start_time) = ?` , [roomId, bookDate]
    );
    return response;
};

export const updateRoomStatus = async (room_id, room_status) => {
    const [response] = await db.promise().query(
    `UPDATE roomList 
    SET room_open = ? 
    WHERE room_id = ?;`, [room_status, room_id])
    return response;
}