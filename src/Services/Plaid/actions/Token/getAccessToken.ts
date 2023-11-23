
import { Bank } from "@prisma/client"
import { prismaClient } from "../../../Prisma/client"
import { plaidClientProvider } from "../../clientProvider"
import { plaidAuth } from "../Auth"

type PlaidGetAccessTokenProps = {
  publicToken: string
  userId: string
}

type PrismaUpdateUserProps = {
  userId: string
  bankId: string
}

type PrismaCreateBankProps = {
  accessToken: string
  institutionId: string
  userId: string
}

const createBank = async ({ accessToken, institutionId, userId }: PrismaCreateBankProps) => {
  try {
    const bank = await prismaClient.bank.create({
      data: {
        id: institutionId,
        accessToken,
        userId
      }
    })

    return bank
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    prismaClient.$disconnect()
  }
}

const updateUser = async ({ userId, bankId }: PrismaUpdateUserProps) => {
  try {
    const user = await prismaClient.user.update({
      where: {
        id: userId
      },
      data: {
        banks: {
          connect: {
            id: bankId
          }
        }
      }
    })

    return user
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    prismaClient.$disconnect()
  }
}

export const getAccessToken = async ({ publicToken, userId }: PlaidGetAccessTokenProps) => {
  try {
    const { data } = await plaidClientProvider.itemPublicTokenExchange({
      public_token: publicToken
    })

    const auth = await plaidAuth({ accessToken: data.access_token })

    if(auth !== undefined) {
      const bank = await createBank({
        accessToken: data.access_token,
        institutionId: auth.item.institution_id as string,
        userId
      })

      await updateUser({
        userId,
        bankId: bank.id
      })

      return ({
        bank
      })
    }
  } catch (error: any) {
    console.error(error)
  }
}