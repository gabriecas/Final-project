import { Request, Response } from "express";
import { userService } from "../services/userSevice";

export const authController = {
  // POST /auth/register
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, birth, phone } = req.body
  
    try {
      const userAlredyExists = await userService.findByEmail(email)

      if (userAlredyExists) {
        throw new Error('Usuário já cadastrado.')
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

  }
}