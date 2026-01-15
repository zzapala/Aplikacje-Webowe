import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'


export class Review extends Model {
    declare id: number;
    declare userId: number;
    declare bookId: number;
    declare rating: number;
    declare description: string;
}

Review.init(
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
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: 'review', // tabela w DB
      modelName: 'Review', // nazwa modelu
      timestamps: true,
    }
  );
  
  export default Review;

