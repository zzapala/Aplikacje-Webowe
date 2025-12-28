import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes'
import bookRoutes from './routes/book.routes'
import cartRoutes from "./routes/cart.routes"

import {authenticateJWT} from "./middleware/auth.middleware"

export const app = express()
dotenv.config();
app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.use("/api/books", bookRoutes);
app.use("/api/cart",authenticateJWT, cartRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

