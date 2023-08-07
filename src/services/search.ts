
import { User } from '@prisma/client';
import { UsersRepository } from '../repositories/users-repository';


interface SearchUsersServiceRequest {
  query?: string
}

interface SearchUsersServiceResponse {
  searchResults: User[]
}

export class SearchService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ query }: SearchUsersServiceRequest): Promise<SearchUsersServiceResponse> {
    const normalizedQuery = query ?? '';
    const searchResults = await this.usersRepository.searchMany(normalizedQuery);
    return { searchResults };
  }
}
