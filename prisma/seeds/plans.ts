import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient()

export const seedPlans = async () => {
  try {
    await prismaClient.plan.deleteMany()
    await prismaClient.plan.createMany({
      data: [
        {
          tier: 'Free',
          price: 0,
          bankAmount: 3,
          accountAmount: 5
        },
        {
          tier: 'Basic',
          price: 20,
          bankAmount: 5,
          accountAmount: 5
        },
        {
          tier: 'Professional',
          price: 50,
          bankAmount: 10,
          accountAmount: 20
        }
      ]
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prismaClient.$disconnect()
  }
}