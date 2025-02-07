import db from "../config/database.js"

export const getBooking = async() => {
    const [response] = await db.promise().query(
        `SELECT staff_id, fname, lname, room_id, start_time, end_time
    FROM floor11LX_bookings`
    );
    return response;
};

export const getBookingById = async(bookId) => {
    const [response] = await db.promise().query(
        `SELECT fname, lname, room_id, start_time, end_time
        FROM floor11LX_bookings
        WHERE book_id = ?`,
        [bookId]
    );
    return response;
}

export const addBooking = async (roomId, staffId, fname, lname, startT, endT) => {
    const [response] = await db.promise().query(
        `INSERT INTO floor11LX_bookings (room_id, staff_id, fname, lname, start_time, end_time)
        VALUES (?, ?, ?, ?, ?, ?)`, 
        [roomId, staffId, fname, lname, startT, endT]
    );
    return response.insertId; //return bookId
};


export const updateBooking = async (bookId, roomId, staffId, fname, lname, descri, startT, endT) => {
    await db.promise().query(
        `UPDATE floor11LX_bookings
        SET 
            room_id = COALESCE(?, room_id),
            staff_id = COALESCE(?, staff_id),
            fname = COALESCE(?, fname),
            lname = COALESCE(?, lname),
            description = COALESCE(?, description),
            start_time = COALESCE(?, start_time),
            end_time = COALESCE(?, end_time)
        WHERE book_id = ?`, 
        [roomId, staffId, fname, lname, descri, startT, endT, bookId]  //bookId be LAST
    );
};


export const deleteBooking = async (bookId) => {
    await db.promise().query(
        `DELETE FROM floor11LX_bookings
        WHERE book_id = ?`,
        [bookId]
    );
};