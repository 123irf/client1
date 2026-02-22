"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import "@/components/Auth.css"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Invalid email or password")
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  function handleGoogleSignIn() {
    signIn("google", { callbackUrl })
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Log in to your KidZoFi account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button onClick={handleGoogleSignIn} className="auth-btn-google">
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="auth-switch">
          Don&apos;t have an account?{" "}
          <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </main>
  )
}
