
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
    const searchTerm = query !== 'undefined' ? query : '';
    const searchResults = await this.usersRepository.searchMany(searchTerm);
    return { searchResults };
  }
}
