/**
 * Prisma Client Singleton (Prisma 7 — driver adapter pattern)
 * 
 * Returns null when DATABASE_URL is not set, so callers
 * can gracefully fall back to mock data.
 */
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient | null {
  const url = process.env.DATABASE_URL
  if (!url) return null

  const pool = new pg.Pool({ connectionString: url })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export const prisma: PrismaClient | null =
  globalForPrisma.prisma ?? createPrismaClient()

if (prisma && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
