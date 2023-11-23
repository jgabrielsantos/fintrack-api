import { provider } from "../../identityProvider"

type CognitoUserAttributesProps = {
  accessToken: string
}

export const cognitoUserAttributes = async ({ accessToken }: CognitoUserAttributesProps) => {
  const attributes = await provider.getUserAttributes({ accessToken })

  const user: any = {}
  attributes.map(attribute => {
    user[attribute.Name] = attribute.Value
  })

  return user
}