import { prismaClient } from "../../client"

type PrismaGetBankProps = {
  userId: string
}

export const prismaGetBank = async ({ userId }: PrismaGetBankProps) => {
  try {
    const bank = await prismaClient.bank.findUnique({
      where: {
        userId
      }
    })

    return bank
  } catch (error: any) {
    console.error(error)
    process.exit(1)
  } finally {
    prismaClient.$disconnect()
  }
}
