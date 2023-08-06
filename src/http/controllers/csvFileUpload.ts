import { Request, Response } from 'express';
import { makeInsertService } from '../../services/factories/make-insert-service';
import { InsertUsersServiceRequest } from '../../services/insert';
import { parseCSV } from '../../utils/parseCsv';
import { UserAlreadyExistsError } from '../../services/errors/user-already-exists-error';

export async function csvFileUpload(req: Request, res: Response) {
  const buffer = req.file?.buffer;

  if (!buffer) {
    return res.status(400).json({ message: 'Invalid file data' });
  }

  try {
    const people: InsertUsersServiceRequest[] = await parseCSV(buffer);

    const insertService = makeInsertService();
    const results = await insertService.execute(people);

    return res.json(results);
  } catch (error) {
    if(error instanceof UserAlreadyExistsError) {
      return res.status(409).json({ message: error.message })
    }
    return res.status(500).json() 
  }
}
