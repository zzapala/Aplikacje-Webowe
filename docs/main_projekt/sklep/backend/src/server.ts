import { app } from './app'
import { sequelize } from './config/database'
import './models/User'

const start = async () => {
  await sequelize.sync()
  console.log('Database synced')

  app.listen(3000, () => {
    console.log('Server running on port 3000')
  })
}

start()
