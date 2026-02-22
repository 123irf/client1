import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { serverClient } from "@/lib/sanity/server-client"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    const existingUser = await serverClient.fetch(
      `*[_type == "user" && email == $email][0]{ _id, provider }`,
      { email: email.toLowerCase().trim() }
    )

    if (existingUser) {
      if (existingUser.provider === "google") {
        return NextResponse.json(
          { error: "This email is registered with Google. Please use Google Sign-In." },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = await serverClient.create({
      _type: "user",
      name,
      email: email.toLowerCase().trim(),
      passwordHash,
      provider: "credentials",
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json(
      { message: "Account created successfully", userId: newUser._id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
