export const getAllLocationQuery: string = `SELECT * FROM location`;

export const insertLocationQuery: string = `INSERT INTO location
(building_id,name, floor, room_num, entry)
 VALUES ($1, $2, $3, $4, $5)
 RETURNING id`;

export const deleteLocationQuery: string = `DELETE FROM location WHERE id = $1 `;

export const updateLocationQuery = `UPDATE location SET 
building_id = $2, name = $3, floor = $5, room_num = $6, entry = $7
WHERE id = $1 RETURNING *`;

export const getLocationByIdQuery = `SELECT * FROM location WHERE id = $1`;
