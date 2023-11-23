import { prismaClient } from "../../client"

type PrismaGetUserProps = {
  authProviderId: string
}

export const prismaGetUser = async ({ authProviderId }: PrismaGetUserProps) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        authProviderId
      }
    })

    return user
  } catch (error: any) {
    console.error(error)
    process.exit(1)
  } finally {
    prismaClient.$disconnect()
  }
}
