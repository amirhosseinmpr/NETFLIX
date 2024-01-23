// prisma/schema.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type User = {
  id: number;
  email: string;
  // Add other user fields as needed
};

export type WatchList = {
  id: number;
  userId: string;
  movieId: number;
  // Add other watchlist fields as needed
};

export { prisma };