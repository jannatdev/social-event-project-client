"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import { cn } from "cn";
import {
  
  Eye,
  EyeOff,
   Lock,
    
} from "lucide-react";


import { AlertCircle, Link2, Mail, Snowflake, User,Check } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";


const BRAND_NAME = "SheetSathi";

type FormValues = {
  name: string;
  email: string;
  photoUrl: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  photoUrl: "",
  password: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;
const HAS_UPPERCASE = /[A-Z]/;
const HAS_LOWERCASE = /[a-z]/;

/**
 * Returns the list of unmet password requirements. An empty array means the
 * password is valid.
 */
function getPasswordErrors(password: string): string[] {
  const problems: string[] = [];

  if (password.length < PASSWORD_MIN_LENGTH) {
    problems.push(`at least ${PASSWORD_MIN_LENGTH} characters`);
  }
  if (!HAS_UPPERCASE.test(password)) {
    problems.push("an uppercase letter");
  }
  if (!HAS_LOWERCASE.test(password)) {
    problems.push("a lowercase letter");
  }

  return problems;
}

function describePasswordProblems(problems: string[]): string {
  if (problems.length === 1) {
    return `Password must contain ${problems[0]}.`;
  }
  const last = problems[problems.length - 1];
  return `Password must contain ${problems.slice(0, -1).join(", ")} and ${last}.`;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your full name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Full name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.photoUrl.trim() && !/^https?:\/\/.+/i.test(values.photoUrl.trim())) {
    errors.photoUrl = "Photo URL must start with http:// or https://";
  }

  if (!values.password) {
    errors.password = "Please create a password.";
  } else {
    const problems = getPasswordErrors(values.password);
    if (problems.length > 0) {
      errors.password = describePasswordProblems(problems);
    }
  }

  return errors;
}

function GoogleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.86c2.26-2.09 3.56-5.17 3.56-8.87Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
      >
        {label}
      </label>
      {children}
      {error }
    </div>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const [values, setValues] = React.useState<FormValues>(initialValues);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const [isGooglePending, setIsGooglePending] = React.useState(false);

  function updateField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear the field error as soon as the user starts typing again.
    setErrors((prev) =>
      prev[field] ? { ...prev, [field]: undefined } : prev
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);

    // Surface validation problems as a toast so they're impossible to miss.
    if (Object.values(nextErrors).some(Boolean)) {
      toast.error( "Please fix the highlighted fields and try again."  );
      return;
    }

    setIsPending(true);
    const {data, error } = await signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      ...(values.photoUrl.trim() ? { image: values.photoUrl.trim() } : {}),
      callbackURL: "/",
    });
    setIsPending(false);
    console .log(data)

    if (error) {
      const message =
        error.message ?? "Could not create your account. Please try again.";
      setFormError(message);
      toast.error( "Sign up failed!")
        
      return;
    }

    toast.success( "Account created!")
      
    router.push("/");
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setFormError(null);
    setIsGooglePending(true);
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) {
      setIsGooglePending(false);
      const message =
        error.message ?? "Could not continue with Google. Please try again.";
      setFormError(message);
      toast.error("Google sign-in failed!")
       
    }
    toast.success("Google Sign-in is success!")
  }

  return (
    <Card
      className={cn(
        "w-full max-w-md overflow-hidden rounded-2xl border-0 py-0 shadow-xl shadow-primary/10 ring-1 ring-foreground/10",
        
      )}
    >
      {/* Green header */}
      <div className="bg-primary px-6 py-8 text-center text-primary-foreground sm:px-8">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/25">
          <Snowflake className="size-6" aria-hidden />
        </span>
        <h1 className="mt-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
          Create Account
        </h1>
        <p className="mt-1.5 text-sm text-primary-foreground/85">
          Join {BRAND_NAME} for free today
        </p>
      </div>

      <CardContent className="px-6 py-6 sm:px-8">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {formError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              <p>{formError}</p>
            </div>
          )}

          <FormField id="name" label="Full name" error={errors.name}>
            <InputGroup className="h-10">
              <InputGroupAddon>
                <User aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                className="h-full"
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={values.name}
                aria-invalid={errors.name ? true : undefined}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </InputGroup>
          </FormField>

          <FormField id="email" label="Email address" error={errors.email}>
            <InputGroup className="h-10">
              <InputGroupAddon>
                <Mail aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                className="h-full"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={values.email}
                aria-invalid={errors.email ? true : undefined}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </InputGroup>
          </FormField>

          <FormField
            id="photoUrl"
            label="Photo URL (optional)"
            error={errors.photoUrl}
          >
            <InputGroup className="h-10">
              <InputGroupAddon>
                <Link2 aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                className="h-full"
                id="photoUrl"
                name="photoUrl"
                type="url"
                autoComplete="url"
                placeholder="https://..."
                value={values.photoUrl}
                aria-invalid={errors.photoUrl ? true : undefined}
                onChange={(event) => updateField("photoUrl", event.target.value)}
              />
            </InputGroup>
          </FormField>

          <FormField id="password" label="Password" error={errors.password}>
            <div className="flex flex-col gap-2">
              <InputGroup className="h-10">
                <InputGroupAddon>
                  <Lock aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  className="h-full"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={values.password}
                  aria-invalid={errors.password ? true : undefined}
                  onChange={(event) => updateField("password", event.target.value)}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-xs"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden />
                    ) : (
                      <Eye aria-hidden />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              {/* Live requirement checklist */}
              <ul className="flex flex-col gap-1 text-xs">
                {[
                  {
                    label: `At least ${PASSWORD_MIN_LENGTH} characters`,
                    met: values.password.length >= PASSWORD_MIN_LENGTH,
                  },
                  {
                    label: "One uppercase letter",
                    met: HAS_UPPERCASE.test(values.password),
                  },
                  {
                    label: "One lowercase letter",
                    met: HAS_LOWERCASE.test(values.password),
                  },
                ].map((rule) => (
                  <li
                    key={rule.label}
                    aria-live="polite"
                    className={cn(
                      "flex items-center gap-1.5 transition-colors",
                      rule.met
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <Check
                      className={cn(
                        "size-3.5",
                        rule.met ? "opacity-100" : "opacity-30"
                      )}
                      aria-hidden
                    />
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>
          </FormField>

          <Button
            type="submit"
            disabled={isPending}
            className="mt-1 h-11 w-full font-heading text-base font-extrabold shadow-sm shadow-primary/30"
          >
            {isPending ? (
              <>
                <Spinner aria-hidden /> Creating account…
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="relative flex h-5 items-center">
            <Separator className="absolute inset-x-0 top-1/2" />
            <span className="relative mx-auto block w-fit bg-card px-2 text-xs text-muted-foreground">
              or continue with
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isGooglePending}
            onClick={handleGoogleSignIn}
            className="h-11 w-full font-semibold"
          >
            {isGooglePending ? (
              <Spinner aria-hidden />
            ) : (
              <GoogleIcon className="size-5" />
            )}
            Continue with Google
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
