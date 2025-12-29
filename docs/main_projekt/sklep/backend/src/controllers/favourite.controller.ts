import { Request, Response } from 'express'
import { Favourite, Book } from '../models'  // ← Import z index.ts

export class FavouriteController {

  // dodaj do ulubionych
  static async add(req: Request, res: Response) {
    try {
      const userId = req.user.id
      const { bookId } = req.body

      if (!bookId) {
        return res.status(400).json({ message: 'bookId is required' })
      }

      // czy już istnieje
      const exists = await Favourite.findOne({
        where: { userId, bookId }
      })

      if (exists) {
        return res.status(409).json({ message: 'Book already in favourites' })
      }

      const favourite = await Favourite.create({
        userId,
        bookId
      })

      return res.status(201).json(favourite)

    } catch (err) {
      return res.status(500).json({ message: 'Server error', err })
    }
  }

  // usuń z ulubionych
  static async remove(req: Request, res: Response) {
    try {
      const userId = req.user.id
      const { bookId } = req.params

      const deleted = await Favourite.destroy({
        where: {
          userId,
          bookId
        }
      })

      if (!deleted) {
        return res.status(404).json({ message: 'Favourite not found' })
      }

      return res.status(200).json({ message: 'Removed from favourites' })

    } catch (err) {
      return res.status(500).json({ message: 'Server error', err })
    }
  }

  // lista ulubionych książek usera
  static async list(req: Request, res: Response) {
    try {
      const userId = req.user.id

      const favourites = await Favourite.findAll({
        where: { userId },
        include: [{
          model: Book
        }]
      })

      return res.status(200).json(favourites)

    } catch (err) {
      return res.status(500).json({ message: 'Server error', err })
    }
  }
}
