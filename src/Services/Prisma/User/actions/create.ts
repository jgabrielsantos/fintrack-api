import { PrismaClient } from "@prisma/client";


const prismaClient = new PrismaClient()

export const prismaUserCreate = async ({ authProviderId }: Record<string, string>) => {
  try {
    await prismaClient.user.create({
      data: {
        authProviderId,
        planId: 'fedc141a-87d0-4e98-a677-ff407781b033'
      }
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    prismaClient.$disconnect()
  }
}
