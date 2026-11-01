import type { Metadata } from "next";


import LogInForm from "@/components/auth/log-in-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-full flex-col items-center justify-center px-4 py-16 sm:px-6">
      
    <LogInForm />


    </div>
   
  );
}
