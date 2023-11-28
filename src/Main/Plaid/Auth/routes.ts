import { Request, Response, Router } from "express";
import { plaidAuth } from "../../../Services/Plaid/actions";
import { prismaGetBank } from "../../../Services/Prisma/Bank/actions";

export const authRoutes = Router()

authRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body

    const bank = await prismaGetBank({ userId })

    const auth = bank.map(async (bank) => await plaidAuth({ accessToken: bank?.accessToken as string }))

    res
      .status(200)
      .json({ auth })
  } catch (error: any) {
    res
      .status(400)
      .json({ Error: error.message })
  }
})
