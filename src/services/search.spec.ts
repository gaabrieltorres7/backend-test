import { beforeEach, expect, test, describe } from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { SearchService } from './search';

let usersRepository: InMemoryUsersRepository
let sut: SearchService

describe('Search service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new SearchService(usersRepository)
  })
  test('should be able to search for any colunm by query', async () => {
    await usersRepository.insert({
      name: 'John Doe',
      city: 'New York',
      country: 'USA',
      favorite_sport: 'Soccer'
    })

    await usersRepository.insert({
      name: 'Jane Doe',
      city: 'New York',
      country: 'USA',
      favorite_sport: 'Soccer'
    })

    const { searchResults } = await sut.execute({ query: 'John' });

    expect(searchResults).toHaveLength(1);
    expect(searchResults[0]).toEqual(expect.objectContaining({ name: 'John Doe' }));
  })
})