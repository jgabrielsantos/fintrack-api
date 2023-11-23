import { provider } from "../../identityProvider"

type CognitoPasswordRecoveryTypes = {
  email: string
}

export const cognitoPasswordRecovery = async ({ email }: CognitoPasswordRecoveryTypes) => {
  const recovery = await provider.forgotPassword({
    username: email
  })

  return recovery
}
