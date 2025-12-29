import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'
import {Book} from "./Book"
import {User} from "./User"

export class Favourite extends Model {
    declare id: string
    declare userId: number;
    declare bookId: number;
}

Favourite.init(
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
      
    },
    {
      sequelize,
      tableName: "favourites",
      timestamps: true,
    }
  );
  
  export default Favourite;

