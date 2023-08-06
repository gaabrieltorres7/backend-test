import { Request, Response } from 'express';

export async function csvFileUpload(req: Request, res: Response) {
  const { file } = req;
  console.log(file?.buffer.toString('utf-8'));
  return res.send();
}