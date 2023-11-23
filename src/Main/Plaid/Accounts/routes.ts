import { Router } from "express";
import { plaidGetAccounts } from "../../../Services/Plaid/actions";

export const accountRoutes = Router()

accountRoutes.post('/', async (req, res) => {
  try {
    const {
      accessToken
    } = req.body

    const accounts = await plaidGetAccounts({
      accessToken
    })

    res
      .status(200)
      .json({ accounts })
  } catch (error: any) {
    res
      .status(400)
      .json({ Error: error.message })
  }
})
