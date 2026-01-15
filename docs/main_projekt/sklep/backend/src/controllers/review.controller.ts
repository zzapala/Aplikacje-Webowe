import { Request, Response } from 'express';
import { Orders, OrderItem, Cart, Book, User,  } from '../models'; 
import Review from '../models/Review';

export const createOpinion = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Brak autoryzacji' })
      }

    const userId = req.user.id
    const { bookId, rating, description } = req.body
  
    if (!bookId || !rating || !description) {
      return res.status(400).json({ message: 'Brak danych' })
    }
  
    const opinion = await Review.create({
      userId,
      bookId,
      rating,
      description,
    })

    const reviewWithUser = await Review.findByPk(opinion.id, {
        include: [{
          model: User,
          attributes: ['login'] 
        }]
      });
  
    res.status(201).json(opinion)
  }
  

// get opinie po bookid
export const getOpinionsByBook = async (req: Request, res: Response) => {
    const { bookId } = req.params;
  
    try {
      const reviews = await Review.findAll({
        where: { bookId },
        include: [{
          model: User,
          attributes: ['login']
        }],
        order: [['createdAt', 'DESC']]
      });
  
      res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Błąd serwera', err });
    }
  };
  
  

// get opinie po userid
export const getMyOpinions = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Brak autoryzacji' })
    }
  
    const opinions = await Review.findAll({
      where: { userId: req.user.id }
    })
  
    res.json(opinions)
  }
  
  

// delete opinie

export const deleteOpinion = async (req: Request, res: Response) => {
    console.log('REQ.PARAMS.ID:', req.params.id); // <--- zobacz co tu przychodzi
  
    const reviewId = Number(req.params.id);
    if (isNaN(reviewId)) {
      return res.status(400).json({ message: 'Nieprawidłowe ID opinii' });
    }
  
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Brak autoryzacji' });
  
    const review = await Review.findByPk(reviewId);
    if (!review) return res.status(404).json({ message: 'Opinia nie istnieje' });
  
    if (user.role !== 'admin' && review.userId !== user.id) {
      return res.status(403).json({ message: 'Brak uprawnień' });
    }
  
    await review.destroy();
    return res.json({ message: 'Opinia usunięta' });
  };
  