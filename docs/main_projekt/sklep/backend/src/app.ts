import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes'
import bookRoutes from './routes/book.routes'
import favouriteRoutes from './routes/favourite.routes'

dotenv.config()

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/favourites', favouriteRoutes)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use((req, res) => {
  console.log('❌ 404 - Route not found:', req.method, req.url)
  res.status(404).json({ message: 'Route not found' })
})