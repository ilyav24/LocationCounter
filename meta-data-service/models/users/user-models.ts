import { Pool } from 'pg';
import {
  getUsers,
  getUserByIdQuery,
  updateUser,
  deleteUserById,
  createNewUser,
  deleteUserByEmail,
  checkUserEmail, 
  checkUserUsername,
  checkUserEmail2,
  checkUserUsername2
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

export async function checkEmail(user: User) {
  try {
    let User2 = (await pool.query(checkUserEmail, [
      user.email,
  ])).rows;
  if(User2.length)
  {
    return null;
  }
  return User2
  } catch (err) {
    throw err;
  }
}

export async function checkEmail2(user: User) {
  try {
    let User2 = (await pool.query(checkUserEmail2, [
      user.email,
      user.id,
  ])).rows;
  if(User2.length)
  {
    return null;
  }
  return User2
  } catch (err) {
    throw err;
  }
}

export async function checkUsername(user: User) {
  try {
    let User2 = (await pool.query(checkUserUsername, [
      user.user_name,
  ])).rows;
  if(User2.length)
  {
    return null;
  }
  return User2
  } catch (err) {
    throw err;
  }
}

export async function checkUsername2(user: User) {
  try {
    let User2 = (await pool.query(checkUserUsername2, [
      user.user_name,
      user.id,
  ])).rows;
  if(User2.length)
  {
    return null;
  }
  return User2
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
