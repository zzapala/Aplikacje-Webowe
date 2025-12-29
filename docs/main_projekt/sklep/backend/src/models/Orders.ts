import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'


export class Orders extends Model {
    declare id: number;
    declare userId: number;
    declare totalPrice: number;
}

Orders.init(
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
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: 'orders', // tabela w DB
      modelName: 'Orders', // nazwa modelu
      timestamps: true,
    }
  );
  
  export default Orders;

