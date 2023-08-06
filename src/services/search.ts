
import { User } from '@prisma/client';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';


interface SearchUsersServiceRequest {
  query?: string
}

interface SearchUsersServiceResponse {
  searchResults: User[]
}

export class SearchService {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({ query }: SearchUsersServiceRequest): Promise<SearchUsersServiceResponse> {
    const searchResults = await this.usersRepository.searchMany(query && query !== 'undefined' ? query : '');
    return { searchResults };
  }
}
