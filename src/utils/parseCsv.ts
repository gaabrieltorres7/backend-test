import { Readable } from 'stream';
import readline from 'readline';
import { InsertUsersServiceRequest } from '../../src/services/insert';

export async function parseCSV(buffer: Buffer): Promise<InsertUsersServiceRequest[]> {
  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const csvLines = readline.createInterface({
    input: readableFile,
  });

  const people: InsertUsersServiceRequest[] = [];

  for await (let line of csvLines) {
    const splittedLine = line.split(',');
    people.push({
      name: splittedLine[0],
      city: splittedLine[1],
      country: splittedLine[2],
      favorite_sport: splittedLine[3],
    });
  }

  return people.slice(1);
}