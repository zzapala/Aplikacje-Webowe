import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'


export class Cart extends Model {
    declare id: string
    declare userId: number;
    declare bookId: number;
    declare quantity: number;
}

Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'cart', // tabela w DB
      modelName: 'Cart', // nazwa modelu
      timestamps: true,
    }
  );
  
  export default Cart;

