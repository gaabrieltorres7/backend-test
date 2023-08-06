import { Request, Response } from "express";
import { makeSearchService } from "../../services/factories/make-search-service";

export const search = async (req: Request, res: Response) => {
  const { q } = req.query;

  const searchService = makeSearchService();
  const { searchResults } = await searchService.execute({
    query: String(q),
  });

  res.status(200).json({ searchResults });
};
