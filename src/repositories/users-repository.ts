import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  insert: (data: Prisma.UserCreateInput) => Promise<User>
  findUserByName(name: string): Promise<User | null>;
}