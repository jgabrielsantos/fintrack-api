import { Router } from "express";
import { plaidGetInstitution } from "../../../Services/Plaid/actions";

export const institutionRoutes = Router()

institutionRoutes.post('/', async (req, res) => {
  try {
    const {
      institutionId
    } = req.body

    const bank = await plaidGetInstitution({
      institutionId
    })

    res
      .status(200)
      .json({ bank })
  } catch (error: any) {
    res
      .status(400)
      .json({ Error: error.message })
  }
})
