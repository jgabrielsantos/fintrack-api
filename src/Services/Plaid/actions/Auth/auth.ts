import { plaidClientProvider } from "../../clientProvider"

type PlaidAuthProps = {
  accessToken: string
}

export const plaidAuth = async ({ accessToken }: PlaidAuthProps) => {
  try {
    const { data } = await plaidClientProvider.authGet({
      access_token: accessToken
    })

    return data
  } catch (error: any) {
    console.error(error)
  }
}
