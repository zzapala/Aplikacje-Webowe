import {Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User'
import jwt from 'jsonwebtoken'


export const register = async (req: Request, res: Response) => {
    const {email, login, password} = req.body

    if (!email || !login || !password) {
        return res.status(400).json({message: "email, login i hasło są wymagane"})
    }

    const existingEmail = await User.findOne({ where: {email}})
    if (existingEmail) {
        return res.status(400).json({message: "uzytkownik z podanym mailem juz istnieje"})
    }

    const existingLogin = await User.findOne({ where: {login}})
    if (existingLogin) {
        return res.status(400).json({message: "uzytkownik z podanym loginem juz istnieje"})
    }

    const hashed = await bcrypt.hash(password,10)

    const user = await User.create({
        email,
        login,
        password: hashed,
        role: "user"
    })

    res.status(201).json({
        id: user.id,
        email: user.email
    })
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
  
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password required' })
    }
  
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'invalid credentials' })
    }
  
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(400).json({ message: 'invalid credentials' })
    }
  
    const secret = process.env.JWT_SECRET

  
    if (!secret) {
      return res.status(500).json({ message: 'JWT secret not configured' })
    }
  
    const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          role: user.role 
        },
        secret,
        { 
          expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as jwt.SignOptions['expiresIn']
        }
      );
  
    res.json({ token })
  }