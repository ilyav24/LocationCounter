

export const DeleteToken = `DELETE FROM Tokens where token = $1 RETURNING token`;

export const checkUser = `SELECT * FROM users where user_name=$1 AND pass=$2`;

export const InsertUser = `INSERT INTO Tokens
(token,user_name,pass)
VALUES ($1, $2, $3)`;