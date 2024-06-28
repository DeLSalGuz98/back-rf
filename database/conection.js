import mysql from 'mysql2/promise'

const dbCredentials = {
  host: 'localhost',
  user: 'root',
  database: 'redfial_db',
  password: 'password',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
}


export async function dbConnection(query, data = []) {
  try {
    const pool = await mysql.createPool(dbCredentials)
    const [rows] = await pool.query(query, data)
   
    return rows
  } catch (err) {
    return err
  }
}