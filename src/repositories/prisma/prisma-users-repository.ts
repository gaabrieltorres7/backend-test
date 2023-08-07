import prisma from "../../db/client";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async insert({
    name,
    city,
    country,
    favorite_sport,
  }: Prisma.UserCreateInput) {
    try {
      const user = await prisma.user.create({
        data: {
          name,
          city,
          country,
          favorite_sport,
        },
      });
      return user;
    } catch (e: unknown) {
      console.log("erro", e);
      throw e;
    }
  }

  async findUserByName(name: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          name,
        },
      });
      return user;
    } catch (e: unknown) {
      console.log("erro", e);
      throw e;
     }
  }

  async searchMany(query: string) {
    if (!query) return await prisma.user.findMany();
    
    const lowerCaseQuery = query.toLowerCase();

    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: lowerCaseQuery,
              },
            },
            {
              city: {
                contains: lowerCaseQuery,
              },
            },
            {
              country: {
                contains: lowerCaseQuery,
              },
            },
            {
              favorite_sport: {
                contains: lowerCaseQuery,
              },
            },
          ],
        },
      });
      return users;
    } catch (e: unknown) {
      console.log("erro", e);
      throw e;
    }
  }
}