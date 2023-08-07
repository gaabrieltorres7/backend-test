import { beforeEach, expect, test, describe } from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { SearchService } from './search';

let usersRepository: InMemoryUsersRepository
let sut: SearchService

const USER_JOHN = {
  name: 'John Doe',
  city: 'New York',
  country: 'USA',
  favorite_sport: 'Soccer'
}

const USER_JANE = {
  name: 'Jane Doe',
  city: 'New York',
  country: 'USA',
  favorite_sport: 'Soccer'
}

describe('Search service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new SearchService(usersRepository)
  })
  test('should be able to search for any colunm by query', async () => {
    await usersRepository.insert(USER_JOHN)
    await usersRepository.insert(USER_JANE)

    const { searchResults } = await sut.execute({ query: 'John' });

    expect(searchResults).toHaveLength(1);
    expect(searchResults[0]).toEqual(expect.objectContaining({ name: 'John Doe' }));
  })

  test('should be able to search and return all users if there is not a query', async () => {
    await usersRepository.insert(USER_JOHN)
    await usersRepository.insert(USER_JANE)

    const { searchResults } = await sut.execute({ query: '' });

    expect(searchResults).toHaveLength(2);
  })
})