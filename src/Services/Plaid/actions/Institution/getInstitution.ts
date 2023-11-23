import { CountryCode } from "plaid"
import { plaidClientProvider } from "../../clientProvider"

type PlaidGetInstitutionProps = {
  institutionId: string
}

export const plaidGetInstitution = async ({ institutionId }: PlaidGetInstitutionProps) => {
  try {
    const { data } = await plaidClientProvider.institutionsGetById({
      institution_id: institutionId,
      country_codes: [CountryCode.Ca]
    })

    console.log({
      institutionId,
      data
    })

    return data
  } catch (error: any) {
    console.error(error.message)
  }
}
