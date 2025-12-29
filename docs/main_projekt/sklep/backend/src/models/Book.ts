import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'
import {User} from "./User"
import {Favourite} from "./Favourite"

export class Book extends Model {
    declare id: string
    declare title: string
    declare author: string
    declare price: number
    declare cover: string
    declare description: string
    declare stock: number
    declare isbn: string
    declare category: string
}

Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "books",
      timestamps: true,
    }
  );
  
  export default Book;
