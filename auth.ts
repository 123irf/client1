import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { serverClient } from "@/lib/sanity/server-client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = credentials.email as string
        const password = credentials.password as string

        const user = await serverClient.fetch(
          `*[_type == "user" && email == $email][0]{
            _id, name, email, passwordHash, image, provider
          }`,
          { email }
        )

        if (!user) return null
        if (user.provider === "google") return null

        const isValid = await bcrypt.compare(password, user.passwordHash)
        if (!isValid) return null

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await serverClient.fetch(
          `*[_type == "user" && email == $email][0]{ _id, provider }`,
          { email: user.email }
        )

        if (existingUser) {
          user.id = existingUser._id
          return true
        }

        const newUser = await serverClient.create({
          _type: "user",
          name: user.name || (profile as any)?.name || "Google User",
          email: user.email,
          image: user.image || (profile as any)?.picture || "",
          provider: "google",
          providerId: account.providerAccountId,
          createdAt: new Date().toISOString(),
        })

        user.id = newUser._id
        return true
      }

      return true
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
        token.provider = account?.provider || "credentials"
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.image = token.image as string | null
        ;(session.user as any).provider = token.provider as string
      }
      return session
    },
  },
})
