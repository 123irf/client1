"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import "@/components/Auth.css"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Signup failed")
      setLoading(false)
      return
    }

    // Auto-login after signup
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      router.push("/login")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join KidZoFi today</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
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
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
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
          Already have an account?{" "}
          <Link href="/login">Log In</Link>
        </p>
      </div>
    </main>
  )
}
