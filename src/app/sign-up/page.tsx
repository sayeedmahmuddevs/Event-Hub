"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";

import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Heart,
  CalendarDays,
  Users,
  HandHeart,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordRequirements = [
    {
      label: "At least 8 characters",
      test: password.length >= 8,
    },
    {
      label: "One uppercase letter (A-Z)",
      test: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter (a-z)",
      test: /[a-z]/.test(password),
    },
    {
      label: "One number (0-9)",
      test: /[0-9]/.test(password),
    },
    {
      label: "One special character (@#$_.! etc.)",
      test: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const isPasswordValid = passwordRequirements.every((item) => item.test);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Please fulfill all password requirements!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      imgUrl: string;
      password: string;
    };

    try {
      const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.imgUrl,
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        return;
      }

      toast.success("Account created successfully!");

      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5fbf7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex flex-col justify-center"
        >
          <div className="max-w-lg">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Heart size={25} />
              </div>

              <span className="text-2xl font-black text-gray-900">
                Event<span className="text-emerald-600">Hub</span>
              </span>
            </Link>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-tight text-gray-900">
              Be Part of
              <span className="block text-emerald-600">Something Great.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create your free account and start connecting with amazing people.
              Discover events, share your ideas, and make a difference in your
              community.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">
              {[
                {
                  icon: CalendarDays,
                  title: "Explore Events",
                  desc: "Discover exciting events around your community.",
                },
                {
                  icon: Users,
                  title: "Build Connections",
                  desc: "Connect with volunteers and event organizers.",
                },
                {
                  icon: HandHeart,
                  title: "Create Impact",
                  desc: "Organize events and help people in need.",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.15 }}
                    className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-white/80 p-4 shadow-sm"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <Icon size={23} />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>

                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Trust Message */}
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-emerald-700">
              <CheckCircle2 size={18} />
              Free to join. Easy to use. Made for everyone.
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - SIGN UP FORM */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="border-0 rounded-3xl bg-white shadow-xl shadow-emerald-900/5">
            <CardHeader className="space-y-3 p-7 sm:p-9">
              {/* Mobile Logo */}
              <Link href="/" className="flex lg:hidden items-center gap-2 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <Heart size={21} />
                </div>

                <span className="text-xl font-black">
                  Event<span className="text-emerald-600">Hub</span>
                </span>
              </Link>

              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <User size={27} />
                </div>
              </div>

              <CardTitle className="text-center text-3xl font-black text-gray-900">
                Create Account
              </CardTitle>

              <CardDescription className="text-center text-gray-500">
                Join EventHub and start making a difference.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-7 pb-8 sm:px-9">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold text-gray-700">
                    Full Name
                  </Label>

                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="h-12 rounded-xl border-gray-200 pl-11 focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-semibold text-gray-700"
                  >
                    Email Address
                  </Label>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="h-12 rounded-xl border-gray-200 pl-11 focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label
                    htmlFor="imgUrl"
                    className="font-semibold text-gray-700"
                  >
                    Image URL
                  </Label>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="imgUrl"
                      name="imgUrl"
                      type="text"
                      placeholder="Enter the URL of your image"
                      required
                      className="h-12 rounded-xl border-gray-200 pl-11 focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="font-semibold text-gray-700"
                  >
                    Password
                  </Label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 rounded-xl border-gray-200 pl-11 pr-12 focus-visible:ring-emerald-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="font-semibold text-gray-700"
                  >
                    Confirm Password
                  </Label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-12 rounded-xl border-gray-200 pl-11 pr-12 focus-visible:ring-emerald-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  {/* Password Match */}
                  {confirmPassword && (
                    <div className="flex items-center gap-2">
                      {password === confirmPassword ? (
                        <>
                          <CheckCircle2
                            size={15}
                            className="text-emerald-600"
                          />
                          <span className="text-xs font-medium text-emerald-600">
                            Passwords match
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={15} className="text-red-500" />
                          <span className="text-xs font-medium text-red-500">
                            Passwords do not match
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={!isPasswordValid || password !== confirmPassword}
                  className="group h-12 w-full rounded-xl bg-emerald-600 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Create Account
                  <ArrowRight
                    size={19}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <Separator className="flex-1" />

                <span className="text-xs font-semibold text-gray-400">
                  OR SIGN UP WITH
                </span>

                <Separator className="flex-1" />
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  <svg
                    viewBox="0 0 48 48"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.77 7.18l7.73 6C44.41 37.95 46.98 31.9 46.98 24.55Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.12.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
                    />
                  </svg>
                  Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.35-3.87-1.35-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.42.36.78 1.06.78 2.14v3.16c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                  GitHub
                </Button>
              </div>

              {/* Sign In */}
              <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* Back Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-gray-500 transition-colors hover:text-emerald-600"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
