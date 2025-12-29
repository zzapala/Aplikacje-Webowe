import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'


export class OrderItem extends Model {
    declare id: number;
    declare orderId: number;
    declare bookId: number;
    declare title: string;
    declare price: number;
    declare quantity: number;
}

OrderItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }

    },
    {
      sequelize,
      tableName: 'orderitem', // tabela w DB
      modelName: 'OrderItem', // nazwa modelu
      timestamps: true,
    }
  );
  
  export default OrderItem;

