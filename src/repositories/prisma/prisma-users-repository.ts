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
}