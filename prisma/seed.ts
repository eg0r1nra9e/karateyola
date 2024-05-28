import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const citiesPath = path.join(process.cwd(), './data/city.json')

async function addCity(city: any) {
  await prisma.city.create({ data: city })
}

async function main() {
  try {
    await prisma.city.deleteMany({})

    const cities = await fs.readJSON(citiesPath)
    for (const city of cities) {
      await addCity(city) //this method will read according to data type
    }

    console.log('successfully seeded')
  } catch (error) {
    console.log(error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
