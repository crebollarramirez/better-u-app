import { SignUp } from "@clerk/nextjs";

export default function SignUpRoute() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
    </div>
  );
}
