import { sequelize } from '../config/database'

import { User } from './User'
import { Book } from './Book'
import { Favourite } from './Favourite'

// ===== RELACJE =====

// many-to-many
User.belongsToMany(Book, {
  through: Favourite,
  foreignKey: 'userId',
  otherKey: 'bookId',
})

Book.belongsToMany(User, {
  through: Favourite,
  foreignKey: 'bookId',
  otherKey: 'userId',
})

// one-to-many (opcjonalnie)
Favourite.belongsTo(User, { foreignKey: 'userId' })
Favourite.belongsTo(Book, { foreignKey: 'bookId' })

User.hasMany(Favourite, { foreignKey: 'userId' })
Book.hasMany(Favourite, { foreignKey: 'bookId' })

export {
  sequelize,
  User,
  Book,
  Favourite,
}
