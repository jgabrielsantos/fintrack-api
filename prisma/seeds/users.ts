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
        authProviderId: '39bad851-89c3-4560-a57e-16fb1dc936ca',
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