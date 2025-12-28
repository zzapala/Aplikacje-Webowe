import { Request, Response } from "express";
import Book from "../models/Book";
import { Op } from "sequelize";


// pobierz wszystkie ksiązki
export const getAllBooks = async (req: Request, res: Response) => {
  const { search, category } = req.query;

  const where: any = {};

  if (search) {
    where.title = { [Op.like]: `%${search}%` };
    where.author = { [Op.like]: `%${search}%` };
    where.description = { [Op.like]: `%${search}%` };
  }

  if (category) {
    where.category = category;
  }

  const books = await Book.findAll({ where });
  res.json(books);
};


// pobierz jedną ksiązke
export const getBookById = async (req: Request, res: Response) => {
  const book = await Book.findByPk(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
};
