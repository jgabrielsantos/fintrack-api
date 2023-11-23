import { plaidClientProvider } from "../../clientProvider"

type PlaidGetAccountsProps = {
  accessToken: string
}

export const plaidGetAccounts = async ({ accessToken }: PlaidGetAccountsProps) => {
  try {
    const { data } = await plaidClientProvider.accountsGet({
      access_token: accessToken
    })

    return data
  } catch (error: any) {
    console.error(error.message)
  }
}
