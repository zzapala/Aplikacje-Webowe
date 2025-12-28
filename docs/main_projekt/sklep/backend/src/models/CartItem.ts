
import { DataTypes, Model } from "sequelize"
import { sequelize } from "../config/database"
import { User } from "./User"        // <-- import User
import { Book } from "./Book"  

export class CartItem extends Model {
  declare id: number
  declare cartId: number
  declare bookId: number
  declare quantity: number
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    sequelize,
    modelName: "cart_items"
  }
)

User.hasMany(CartItem, { foreignKey: "userId" })
CartItem.belongsTo(User, { foreignKey: "userId" })

Book.hasMany(CartItem, { foreignKey: "bookId" })
CartItem.belongsTo(Book, { foreignKey: "bookId" })
