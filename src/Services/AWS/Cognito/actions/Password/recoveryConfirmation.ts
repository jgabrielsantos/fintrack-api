import { provider } from "../../identityProvider"

type CognitoPasswordRecoveryConfirmationTypes = {
  email: string
  newPassword: string
  code: string
}

export const cognitoPasswordRecoveryConfirmation = async ({email, newPassword, code}: CognitoPasswordRecoveryConfirmationTypes) => {
  const confirmation = await provider().confirmForgotPassword({
    username: email,
    newPassword,
    code
  })

  return confirmation
}
