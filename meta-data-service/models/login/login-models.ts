import { DeleteToken,checkUser,InsertUser } from "./login-queries";
import { Pool } from 'pg';
const dotenv = require("dotenv");
dotenv.config();
process.env.ACCESS_TOKEN;
const jwt = require ('jsonwebtoken');

const user: String | undefined = process.env.DB_USER;
const password: String | undefined = process.env.DB_PASS;

const connectionString =
  'postgres://' + user + ':' + password + '@localhost:5432';
const databaseName = 'location_counter';

const pool = new Pool({
  connectionString: connectionString + '/' + databaseName,
});

export async function createToken(user_name:string,pass:string) {
    try {
        let User = (await pool.query(checkUser, [
            user_name,
            pass,
        ])).rows;
        console.log(User);
        if(!User.length){
          console.log('no user');
        }
        const User1 = {name:user_name};
        let token = jwt.sign(User1, process.env.ACCESS_TOKEN, { expiresIn: '1800s' });
      return (token);
    } catch (err) {
      throw err;
    }
  }

export async function deleteToken(token: string) {
    try {
      let res = (await pool.query(DeleteToken, [token])).rows;
      return res.length;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }