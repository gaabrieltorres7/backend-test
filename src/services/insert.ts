import { User } from '@prisma/client';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

export interface InsertUsersServiceRequest {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

interface InsertUsersServiceResponse {
  user?: User;
}

export class InsertService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(users: InsertUsersServiceRequest[]): Promise<InsertUsersServiceResponse[]> {
    const results: InsertUsersServiceResponse[] = [];

    for (const user of users) {
      const existingUser = await this.usersRepository.findUserByName(user.name);
      if (existingUser) {
        throw new UserAlreadyExistsError()
      } else {
        const newUsers = await this.usersRepository.insert(user);
        results.push({ user: newUsers });
      }
    }

    return results;
  }
}
