import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async insert(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      ...data,
    };

    this.items.push(user);

    return user;
  }

  async findUserByName(name: string) {
    const user = this.items.find((user) => user.name === name);

    return user || null;
  }
}
