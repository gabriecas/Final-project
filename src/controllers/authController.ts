import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";

export const authController = {
  // POST /auth/register
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, birth, phone } = req.body
  
    try {
      const userAlredyExists = await userService.findByEmail(email)

      if (userAlredyExists) {
        throw new Error('Email de usuário já cadastrado.')
      }

      const user = await userService.create({
        firstName,
        lastName,
        birth,
        phone,
        email,
        password,
        role: 'user'
      })

      return res.status(201).json(user)
      
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  //POST /auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
      const user = await userService.findByEmail(email)

      if (!user) return res.status(401).json({ message: 'Email não registrado'})

      user.checkPassword(password, (error, same) => {
        if (error) return res.status(400).json({ message: error.message})
        if(!same) return res.status(401).json({ message: 'Senha incorreta'})

        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email
        }
        const token = jwtService.signToken(payload, '1d')

        return res.json({ authenticated: true, ...payload, token })
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  }
}