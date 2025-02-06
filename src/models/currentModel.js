import db from "../config/database.js"

export const addCurrentRoom = async(roomId, bookId, startT, endT) => {
    await db.promise().query(
        `UPDATE current_room_floor11LX
        SET room_status = 1, book_id = ?, start_time = ?, end_time = ?
        WHERE room_id = ?`,
        [bookId, startT, endT, roomId]
    );
};

export const getCurrentRoom = async() => {
    const [response] = await db.promise().query(
        `SELECT *
        FROM current_room_floor11LX`
    );
    return response;
};