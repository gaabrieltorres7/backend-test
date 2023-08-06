import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { InsertService } from "../../services/insert";

export function makeInsertService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const useCase = new InsertService(prismaUsersRepository);

  return useCase;
}