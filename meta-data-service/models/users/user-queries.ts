
export const getUsers = `SELECT * FROM users`;

export const getUserByIdQuery = `SELECT * FROM users where id=$1`;

export const createNewUser = `INSERT INTO users (user_name, email, user_type,pass) VALUES ($1,$2,$3,$4) RETURNING id`;

export const updateUser = `UPDATE public.users
SET  user_name=$2, email=$3, user_type=$4
WHERE id=$1 RETURNING *;`;

export const deleteUserById = `DELETE FROM users where id = $1 RETURNING id`;

export const deleteUserByEmail = `DELETE FROM users where email = $1 RETURNING email`;

export const checkUserEmail = `SELECT * FROM users where email=$1`;

export const checkUserUsername = `SELECT * FROM users where user_name=$1`;

export const checkUserEmail2 = `SELECT * FROM users where email=$1 AND id!=$2`;

export const checkUserUsername2 = `SELECT * FROM users where user_name=$1 AND id!=$2`;