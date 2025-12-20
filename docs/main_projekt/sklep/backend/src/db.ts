import { Pool } from 'pg'

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shop',
  password: 'twoje_haslo',
  port: 5432,
})
