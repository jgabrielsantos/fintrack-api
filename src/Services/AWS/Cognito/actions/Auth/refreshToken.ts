import { provider } from "../../identityProvider"

type CognitoRefreshTokenProps = {
  refreshToken: string
  sub: string
}

export const cognitoRefreshToken = async ({refreshToken, sub}: CognitoRefreshTokenProps) => {
  const token = await provider.refreshToken({
    refreshToken,
    sub
  })

  return token
}
