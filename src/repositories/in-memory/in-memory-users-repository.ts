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
    return this.items.find((user) => user.name === name) || null;
  }

  async searchMany(query: string) {
    if (!query) return this.items;

    const lowerCaseQuery = query.toLowerCase(); 
  
    return this.items.filter((item) => {
      const matchQuery = (value: string) => value.toLowerCase().includes(lowerCaseQuery);

      return (
        matchQuery(item.name) ||
        matchQuery(item.city) ||
        matchQuery(item.country) ||
        matchQuery(item.favorite_sport)
      );
    });
  }
}