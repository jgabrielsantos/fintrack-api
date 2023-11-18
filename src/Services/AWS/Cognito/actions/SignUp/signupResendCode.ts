import { provider } from "../../identityProvider"

type CognitoSignUpResendCodeTypes = {
  email: string
}

export const cognitoSignUpResendCode = async ({ email }: CognitoSignUpResendCodeTypes) => {
  const resendCode = await provider().resendSignUpConfirmationCode({
    username: email
  })

  return resendCode
}