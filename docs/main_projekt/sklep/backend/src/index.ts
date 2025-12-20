import express from 'express'
import cors from 'cors'
import { pool } from './db'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(3001, () => {
  console.log('Server running on port 3001')
})
