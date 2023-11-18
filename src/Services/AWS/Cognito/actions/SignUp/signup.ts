import { provider } from "../../identityProvider"

type CognitoSignUpTypes = {
  givenName: string
  familyName: string
  phoneNumber: string
  email: string
  password: string
}

export const cognitoSignup = async ({givenName, familyName, phoneNumber, email, password}: CognitoSignUpTypes) => {
  const signup = await provider().signUp({
    username: email,
    password,
    attributes: [
      {
        Name: 'given_name',
        Value: givenName
      },
      {
        Name: 'family_name',
        Value: familyName
      },
      {
        Name: 'phone_number',
        Value: phoneNumber
      },
    ]
  })

  return signup
}
