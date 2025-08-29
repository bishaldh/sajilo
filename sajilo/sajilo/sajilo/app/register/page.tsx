"use client";
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
      } else {
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout footerStyle={1}>
        <div className="container pt-140 pb-170">
          <div className="row">
            <div className="col-lg-5 mx-auto">
              <div className="register-content border rounded-3 px-md-5 px-3 ptb-50">
                <div className="text-center">
                  <p className="neutral-1000 px-4 py-2 bg-2 text-sm-bold rounded-12 d-inline-flex align-items-center">Register</p>
                  <h4 className="neutral-1000">Create an Account</h4>
                </div>
                <div className="form-login mt-30">
                  <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <div className="form-group">
                      <input
                        className="form-control email"
                        type="text"
                        placeholder="Email / Username"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control password"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className="form-group my-3">
                      <div className="box-remember-forgot">
                        <div className="remeber-me d-flex align-items-center neutral-500">
                          <input className="cb-remember" type="checkbox" disabled />
                          I agree to term and conditions
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-30">
                      <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign up"}
                        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-md-medium neutral-500 text-center">Or connect with your social account</p>
                    <div className="box-button-logins">
                      <Link className="btn btn-login btn-google mr-10" href="#">
                        <img src="/assets/imgs/template/popup/google.svg" alt="Carento" />
                        <span className="text-sm-bold">Sign up with Google</span>
                      </Link>
                      <Link className="btn btn-login mr-10" href="#">
                        <img src="/assets/imgs/template/popup/facebook.svg" alt="Carento" />
                      </Link>
                      <Link className="btn btn-login" href="#">
                        <img src="/assets/imgs/template/popup/apple.svg" alt="Carento" />
                      </Link>
                    </div>
                    <p className="text-sm-medium neutral-500 text-center mt-70">Already have an account? <Link className="neutral-1000" href="/login">Login Here !</Link></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}