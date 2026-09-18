import  pg from 'pg';
import 'dotenv/config';
 const {Pool} = pg;

  export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});

  pool.query('SELECT NOW()')
  .then((result)=>{
    console.log('Database connected successfully:', result.rows[0]);
  })
  .catch((error)=>{
    console.error('Error connecting to the database:', error);
  })