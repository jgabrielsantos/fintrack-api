import { Request, Response, Router } from "express";
import { cognitoSignUpConfirmation, cognitoSignUpResendCode, cognitoSignup } from "../../Services/AWS/Cognito/actions";
import { prismaUserCreate } from "../../Services/Prisma/User/actions";


export const signUpRoutes = Router()

signUpRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const {
      givenName,
      familyName,
      phoneNumber,
      email,
      password
    } = req.body

    const signUp = await cognitoSignup({
      givenName,
      familyName,
      phoneNumber,
      email,
      password
    })

    prismaUserCreate({ authProviderId: signUp.id })

    res
      .status(201)
      .json({ signUp })
  } catch (error: any) {
    res
      .json({
        Error: error.message
      })
  }
})

signUpRoutes.post('/confirm/resend-code', async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const resendCode = await cognitoSignUpResendCode({
      email
    })

    res
      .status(200)
      .json({ resendCode })
  } catch (error: any) {
    res.json({
      Error: error.message
    })
  }
})

signUpRoutes.post('/confirm', async (req: Request, res: Response) => {
  try {
    const {
      email,
      code
    } = req.body

    const confirmation = await cognitoSignUpConfirmation({
      email,
      code
    })

    res
      .status(200)
      .json({ confirmation })
  } catch (error: any) {
    res.json({
      Error: error.message
    })
  }
})
