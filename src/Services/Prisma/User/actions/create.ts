import { prismaClient } from "../../client";

export const prismaUserCreate = async ({ authProviderId }: Record<string, string>) => {
  try {
    await prismaClient.user.create({
      data: {
        authProviderId,
        planId: '1479aaa9-d0ce-4fa7-99d4-a0a1656587a4'
      }
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    prismaClient.$disconnect()
  }
}
