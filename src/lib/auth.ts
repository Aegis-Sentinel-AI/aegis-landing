import type { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from "next-auth/adapters"
import { prisma } from "./prisma"

// ─── Shared cookie domain so landing + portal share one session ───
const COOKIE_DOMAIN =
  process.env.NODE_ENV === "production" ? ".aegissentinel.online" : undefined

/**
 * Canonical NextAuth configuration used by both
 *   aegis-landing-next  (aegissentinel.online)
 *   aegis-portal        (portal.aegissentinel.online)
 *
 * Both apps MUST set the same NEXTAUTH_SECRET env var.
 */
export const authOptions: NextAuthOptions = {
  // Use Prisma adapter when a DB client is available; fall back to JWT-only
  adapter: prisma ? (PrismaAdapter(prisma) as Adapter) : undefined,

  providers: [
    // ── Email + password ─────────────────────────────
    CredentialsProvider({
      id: "credentials",
      name: "Email Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null

        if (!prisma) {
          // No DB — reject all credential logins
          console.warn("[auth] Prisma client unavailable — cannot verify credentials")
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        })

        if (!user || !user.passwordHash) return null

        // Dynamic import so the module loads only at auth time
        const bcrypt = await import("bcryptjs")
        const valid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!valid) return null

        // Update last-login timestamp
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        })

        return {
          id: user.id,
          name: user.name ?? user.email,
          email: user.email,
          image: user.avatar ?? user.image ?? null,
          role: user.role,
        } as User & { role: string }
      },
    }),

    // ── Wallet login ─────────────────────────────────
    CredentialsProvider({
      id: "wallet",
      name: "Wallet Login",
      credentials: {
        address: { label: "Wallet Address", type: "text" },
        signature: { label: "Signature", type: "text" },
        message: { label: "Message", type: "text" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.address) return null

        const address = credentials.address.toLowerCase()

        // If Prisma is available, upsert the wallet user
        if (prisma) {
          const user = await prisma.user.upsert({
            where: { walletAddress: address },
            update: { lastLogin: new Date() },
            create: {
              walletAddress: address,
              email: `${address.slice(2, 10)}@wallet.aegis`,
              name: `${credentials.address.slice(0, 6)}...${credentials.address.slice(-4)}`,
              provider: "wallet",
              role: "viewer",
            },
          })

          return {
            id: user.id,
            name: user.name ?? undefined,
            email: user.email,
            role: user.role,
          } as User & { role: string }
        }

        // Fallback: stateless JWT wallet login
        return {
          id: address,
          name: `${credentials.address.slice(0, 6)}...${credentials.address.slice(-4)}`,
          email: `${address.slice(2, 10)}@wallet.aegis`,
          role: 'viewer',
        } as User & { role: string }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    // Credentials provider requires JWT strategy (sessions cannot be created
    // by the adapter for the credentials provider in NextAuth v4).
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = (user as Record<string, unknown>).role ?? 'viewer'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        const u = session.user as Record<string, unknown>
        u.id = token.id
        u.role = token.role ?? 'viewer'
      }
      return session
    },
  },

  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: COOKIE_DOMAIN,
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
