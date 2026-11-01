import type { Metadata } from "next";

import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-full flex-col items-center justify-center px-4 py-16 sm:px-6">
      <SignUpForm />
    </div>
  );
}
