import { beforeEach, expect, test, describe } from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { InsertService } from './insert';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository
let sut: InsertService

describe('Insert service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new InsertService(usersRepository)
  })

  test('should be able to insert', async () => {
    const users = [
      {
        name: 'John Doe',
        city: 'New York',
        country: 'USA',
        favorite_sport: 'Soccer'
      },
      {
        name: 'Jane Doe',
        city: 'New York',
        country: 'USA',
        favorite_sport: 'Soccer'
      }
    ]

    const results = await sut.execute(users)

    expect(results).toEqual([
      { user: expect.objectContaining({ name: 'John Doe' }) },
      { user: expect.objectContaining({ name: 'Jane Doe' }) }
    ])
  })

  test('should not be able to insert with same name twice', async () => {
    const users = [
      {
        name: 'John Doe',
        city: 'New York',
        country: 'USA',
        favorite_sport: 'Soccer'
      },
      {
        name: 'John Doe',
        city: 'New York',
        country: 'USA',
        favorite_sport: 'Soccer'
      }
    ]

    await expect(sut.execute(users)).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})