import { plaidClientProvider } from "../../clientProvider"

type PlaidGetTransactionsProps = {
  accessToken: string
  startDate: string
  endDate: string
}

export const plaidGetTransactions = async ({ accessToken, startDate, endDate }: PlaidGetTransactionsProps) => {
  try {
    const current = await plaidClientProvider.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate
    })

    const currentTransactions = current.data.transactions.map((transaction: any) => ({
        account: transaction.account_id,
        amount: transaction.amount,
        date: transaction.date,
        merchant: transaction.merchant_name || transaction.name,
        category: transaction.category[0],
    }))

    return currentTransactions
  } catch (error: any) {
    console.error(error)
  }
}
