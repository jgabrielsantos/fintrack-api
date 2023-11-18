import { Request, Response, Router } from "express";
import { cognitoPasswordRecovery, cognitoPasswordRecoveryConfirmation } from "../../Services/AWS/Cognito/actions/Password";

export const passwordRoutes = Router()

passwordRoutes.post('/recovery', async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const recoverPassword = cognitoPasswordRecovery({
      email
    })

    res
      .status(200)
      .json({ recoverPassword })
  } catch (error: any) {
    res.json({
      Error: error.message
    })
  }
})

passwordRoutes.post('/recovery/confirmation', async (req: Request, res: Response) => {
  try {
    const {
      email,
      newPassword,
      code
    } = req.body

    const recoverPasswordConfirmation = await cognitoPasswordRecoveryConfirmation({
      email,
      newPassword,
      code
    })

    res
      .status(200)
      .json({ recoverPasswordConfirmation })
  } catch (error: any) {
    res.json({
      Error: error.message
    })
  }
})
