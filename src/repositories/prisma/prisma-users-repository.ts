import prisma from '../../db/client'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository{
  async insert({ name, city, country, favorite_sport }: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name,
        city,
        country,
        favorite_sport
      },
    })

    return user
  }
  
  async findUserByName(name: string){
    const user = await prisma.user.findFirst({
      where: {
        name: name
      }
    })

    return user || null
  }

  async searchMany(query: string){
    const lowerCaseQuery = query.toLowerCase()

    if(!query) return await prisma.user.findMany();

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: lowerCaseQuery } },
          { city: { contains: lowerCaseQuery } },
          { country: { contains: lowerCaseQuery } },
          { favorite_sport: { contains: lowerCaseQuery } },
        ],
      },
    })
    return users;
  }
}