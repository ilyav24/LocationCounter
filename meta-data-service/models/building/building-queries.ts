export const getAllBuildingQuery:string = `SELECT * FROM  building`

export const insertBuildingQuery:string =
`INSERT INTO building
(name, num_of_floors)
 VALUES ($1, $2)
 RETURNING id`