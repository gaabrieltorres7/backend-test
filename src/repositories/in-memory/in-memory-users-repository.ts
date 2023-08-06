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

  async searchMany(query: string) {
    const lowerCaseQuery = query.toLowerCase(); // Convert the query to lowercase for case-insensitive search
  
    const searchResults = this.items.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(lowerCaseQuery);
      const cityMatch = item.city.toLowerCase().includes(lowerCaseQuery);
      const countryMatch = item.country.toLowerCase().includes(lowerCaseQuery);
      const sportMatch = item.favorite_sport.toLowerCase().includes(lowerCaseQuery);
  
      // Return true if any of the properties match the query
      return nameMatch || cityMatch || countryMatch || sportMatch;
    });
  
    return searchResults;
  }
  
}
