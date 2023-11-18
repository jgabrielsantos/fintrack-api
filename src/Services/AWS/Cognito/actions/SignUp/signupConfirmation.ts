import { provider } from "../../identityProvider"

type CognitoSignUpConfirmationTypes = {
  email: string
  code: string
}

export const cognitoSignUpConfirmation = async ({ email, code }: CognitoSignUpConfirmationTypes) => {
  const confirmation = await provider().confirmSignUp({
    username: email,
    code
  })

  return confirmation
}