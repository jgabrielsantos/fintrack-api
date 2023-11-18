import { Request, Response, Router } from "express";
import { cognitoLogin } from "../../Services/AWS/Cognito/actions";

export const authRoutes = Router()

authRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const {
      email,
      password
    } = req.body

    const login = await cognitoLogin({
      email,
      password
    })
  
    res.status(200).json({ login })
  } catch (error: any) {
    console.error(error)
    res
      .status(401)
      .json({
        Error: error.message
      })
  }
})
