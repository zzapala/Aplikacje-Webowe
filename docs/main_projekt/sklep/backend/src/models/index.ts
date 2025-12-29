import { sequelize } from '../config/database'

import { User } from './User'
import { Book } from './Book'
import { Favourite } from './Favourite'
import { Cart } from './Cart'
import { Orders } from './Orders'
import { OrderItem } from './OrderItem'

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

User.belongsToMany(Book, {
  through: Cart,
  foreignKey: 'userId',
  otherKey: 'bookId',
})

Book.belongsToMany(User, {
  through: Cart,
  foreignKey: 'bookId',
  otherKey: 'userId',
})

// one-to-many (opcjonalnie)
Favourite.belongsTo(User, { foreignKey: 'userId' })
Favourite.belongsTo(Book, { foreignKey: 'bookId' })

User.hasMany(Favourite, { foreignKey: 'userId' })
Book.hasMany(Favourite, { foreignKey: 'bookId' })

Cart.belongsTo(User, { foreignKey: 'userId' })
Cart.belongsTo(Book, { foreignKey: 'bookId' })

User.hasMany(Cart, { foreignKey: 'userId' })
Book.hasMany(Cart, { foreignKey: 'bookId' })

User.hasMany(Orders, { foreignKey: 'userId' });
Orders.belongsTo(User, { foreignKey: 'userId' });

Orders.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Orders, { foreignKey: 'orderId' });

Book.hasMany(OrderItem, { foreignKey: 'bookId' });
OrderItem.belongsTo(Book, { foreignKey: 'bookId' });



export {
  sequelize,
  User,
  Book,
  Favourite,
  Cart,
  Orders,
  OrderItem
}
