import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { SearchService } from "../search";

export function makeSearchService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const useCase = new SearchService(prismaUsersRepository);

  return useCase;
}