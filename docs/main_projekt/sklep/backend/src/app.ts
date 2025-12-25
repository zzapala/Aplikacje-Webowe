import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';


import authRoutes from './routes/auth.routes'

export const app = express()
dotenv.config();

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

