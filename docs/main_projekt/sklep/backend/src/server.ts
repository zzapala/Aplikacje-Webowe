
import './models' 
import { app } from './app'
import { sequelize } from './config/database'
import './models/User'
import './models/Book'
import { seedBooks } from './seed/seedBooks'
import dotenv from "dotenv"

const start = async () => {
  await sequelize.sync()
  console.log('Database synced')
  dotenv.config()

// await Book.destroy({ where: {}, truncate: true, restartIdentity: true });
  await seedBooks();
  
  app.listen(3000, () => {
    console.log('Server running on port 3000')
  })
}

start()
