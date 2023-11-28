import { CountryCode, Products } from "plaid"
import { plaidClientProvider } from "../../clientProvider"
import { prismaClient } from "../../../Prisma/client"

type CreateLinkTokenProps = {
  user: {
    id: string
    email: string
    phoneNumber: string
  }
  products: Products[]
  countries: CountryCode[]
}

export const createLinkToken = async ({
  user,
  products,
  countries
}: CreateLinkTokenProps) => {
  try {
    const token = await plaidClientProvider.linkTokenCreate({
      user: {
        client_user_id: user.id,
        email_address: user.email,
        phone_number: user.phoneNumber
      },
      language: 'en',
      client_name: 'FinTrack',
      products,
      country_codes: countries,
      redirect_uri: 'http://localhost:3000/',
    })

    return token.data
  } catch (error: any) {
    console.error(error)
    return {
      Error: `Plaid Token error: ${error.message}`
    }
  } finally {
    prismaClient.$disconnect()
  }
}
