import { provider } from "../../identityProvider"

type CognitoLoginTypes = {
  email: string
  password: string
}

export const cognitoLogin = async ({email, password}: CognitoLoginTypes) => {
  const login = await provider().login({
    username: email,
    password
  })

  return login
}
