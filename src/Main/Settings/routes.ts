import { Router } from "express";
import { cognitoUpdateUser } from "../../Services/AWS/Cognito/actions/User";

export const settingsRoutes = Router()

settingsRoutes.post('/update-user', async (req, res) => {
  try {
    const {
      accessToken,
      attributes
    } = req.body

    const user = await cognitoUpdateUser({
      accessToken,
      attributes
    })

    res
      .status(200)
      .json({ user })
  } catch (error: any) {
    res
      .status(400)
      .json({ Error: error.message })
  }
})
