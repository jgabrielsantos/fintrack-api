import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient()

export const seedUsers = async () => {
  try {
    const [_, freePlan] = await Promise.all([
      prismaClient.user.deleteMany(),
      prismaClient.plan.findUnique({
        where: {
          tier: 'Free'
        }
      })
    ])
    await prismaClient.user.create({
      data: {
        authProviderId: 'cbaac1b8-d16f-436e-a620-034883b57774',
        planId: freePlan?.id || ''
      }
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prismaClient.$disconnect()
  }
}