import { Request, Response, Router } from "express";
import { cognitoLogin } from "../../../Services/AWS/Cognito/actions";
import { cognitoUserAttributes } from "../../../Services/AWS/Cognito/actions/User";
import { prismaGetUser } from "../../../Services/Prisma/User/actions";
import { jwtDecode } from 'jwt-decode'
import { prismaGetBank } from "../../../Services/Prisma/Bank/actions";

export const authRoutes = Router()

authRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const {
      email,
      password
    } = req.body

    const { authenticationData } = await cognitoLogin({
      email,
      password
    })

    const { username } = jwtDecode(authenticationData?.accessToken || '') as Record<string, string>

    const attributes = await cognitoUserAttributes({ accessToken: authenticationData?.accessToken as string })

    const user = await prismaGetUser({ authProviderId: username })

    const bank = await prismaGetBank({ userId: user?.id as string})

    res
      .status(200)
      .json({
        user: {
          id: user?.id,
          planId: user?.planId,
          authProviderId: user?.authProviderId,
          givenName: attributes.given_name,
          familyName: attributes.family_name,
          email: attributes.email,
          phoneNumber: attributes.phone_number
        },
        tokens: {
          banksToken: [{
            id: bank?.id as string,
            accessToken: bank?.accessToken as string
          }],
          accessToken: authenticationData?.accessToken,
          refreshToken: authenticationData?.refreshToken
        }
      })
  } catch (error: any) {
    res
      .status(401)
      .json({
        Error: error.message
      })
  }
})
