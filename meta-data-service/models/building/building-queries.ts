export const getAllBuildingQuery: string = `SELECT * FROM  building`;

export const insertBuildingQuery: string = `INSERT INTO building
(name, number_of_floors)
 VALUES ($1, $2)
 RETURNING id`;

export const deleteBuildingQuery: string = `DELETE FROM 
building 
WHERE id = $1`;
export const deleteAllLocationsAndBuilding = `DELETE FROM location
WHERE building_id = $1 `;

export const updateBuildingQuery = `UPDATE building 
SET name = $2, number_of_floors = $3
WHERE id = $1 RETURNING *`;

export const getBuildingByIdQuery = `SELECT * FROM building WHERE id = $1`;
