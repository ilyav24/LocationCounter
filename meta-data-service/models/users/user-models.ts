import { Pool } from 'pg';
import {
  getUsers,
  getUserByIdQuery,
  updateUser,
  deleteUserById,
  createNewUser,
  deleteUserByEmail,
} from './user-queries';
import { User } from './user';

import * as dotenv from 'dotenv';

dotenv.config();

const user: String | undefined = process.env.DB_USER;
const password: String | undefined = process.env.DB_PASS;

const connectionString =
  'postgres://' + user + ':' + password + '@localhost:5432';
const databaseName = 'location_counter';

const pool = new Pool({
  connectionString: connectionString + '/' + databaseName,
});

export async function getAllUsers() {
  try {
    return (await pool.query(getUsers)).rows;
  } catch (err) {
    throw err;
  }
}

export async function insertUser(user: User) {
  try {
    return (
      await pool.query(createNewUser, [
        user.user_name,
        user.email,
        user.user_type,
        user.pass,
      ])
    ).rows;
  } catch (err) {
    throw err;
  }
}

export async function deleteUser(id: number) {
  try {
    let res = (await pool.query(deleteUserById, [id])).rows;
    return res.length;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateUserDetails(user: User) {
  try {
    return (
      await pool.query(updateUser, [
        user.id,
        user.user_name,
        user.email,
        user.user_type,
      ])
    ).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getUserById(id: string) {
  try {
    return (await pool.query(getUserByIdQuery, [id])).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function DeleteUserByEmail(email: string) {
  try {
    let res = (await pool.query(deleteUserByEmail, [email])).rows;
    return res.length;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
