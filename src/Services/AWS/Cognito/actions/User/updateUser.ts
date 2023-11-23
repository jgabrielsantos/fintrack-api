import { provider } from "../../identityProvider"

type CognitoUpdateUserProps = {
  accessToken: string
  attributes: {
    Name: string
    Value: string
  }[]
}

export const cognitoUpdateUser = async ({ accessToken, attributes }: CognitoUpdateUserProps) => {
  try {
    const user = await provider.updateUserAttributes({
      accessToken,
      attributes
    })

    console.log(user)

    return user
  } catch (error: any) {
    console.error(error.message)
  }
}
