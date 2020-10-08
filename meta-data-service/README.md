# To Run Server

Run in command line:  
`cd meta-data-service`

Install dependencies:  
`npm i`

Add `.env` file with your postgres credentials:  
`touch .env`

File content:  
`DB_USER="<db_user_name>"`  
`DB_PASS="<db_user_pass>"`  
`ACCESS_TOKEN="<some_token>"`

Run database initializer:  
`npm run setup`  
Should produce no error

`npm start`

Test if it's working:  
`curl http://localhost:5000`

You can seed data using the command:  
`npm run seed`

Should return:  
`I'm up and running!`
