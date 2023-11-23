import { Request, Response, Router } from "express";
import { jwtDecode } from "jwt-decode";
import { cognitoRefreshToken } from "../../../Services/AWS/Cognito/actions/Auth/refreshToken";
import { cognitoUserAttributes } from "../../../Services/AWS/Cognito/actions/User";
import { prismaGetUser } from "../../../Services/Prisma/User/actions";
import { prismaGetBank } from "../../../Services/Prisma/Bank/actions";

export const refreshRoutes = Router()

refreshRoutes.post('/refresh', async (req: Request, res: Response) => {
  try {
    const {
      refreshToken,
      sub
    } = req.body

    const token = await cognitoRefreshToken({
      refreshToken,
      sub
    })

    const { username } = jwtDecode(token.accessToken || '') as Record<string, string>

    const attributes = await cognitoUserAttributes({ accessToken: token.accessToken as string})

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
          accessToken: token.accessToken
        }
      })
  } catch (error: any) {
    res
      .status(400)
      .json({ Error: error.message })
  }
})
