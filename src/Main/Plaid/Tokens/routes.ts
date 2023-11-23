import { Router } from "express";
import { createLinkToken, getAccessToken } from "../../../Services/Plaid/actions";
import { CountryCode, Products } from "plaid";

export const tokenRoutes = Router()

tokenRoutes.post('/create_link_token', async (req, res) => {
  try {
    const {
      id,
      email,
      phoneNumber
    } = req.body

    const accessToken = await createLinkToken({
      user: {
        id,
        email,
        phoneNumber
      },
      products: [Products.Auth, Products.Transactions],
      countries: [CountryCode.Ca]
    })

    res
      .status(200)
      .json({ accessToken })
  } catch (error: any) {
    res
      .json({
        Error: `Create Link Token error: ${error}`
      })
  }
})

tokenRoutes.post('/get_access_token', async (req, res) => {
  try {
    const {
      publicToken,
      userId
    } = req.body

    const tokens = await getAccessToken({
      publicToken,
      userId
    })

    res.json({ tokens })
  } catch (e) {
    console.log(e)
  }
})
