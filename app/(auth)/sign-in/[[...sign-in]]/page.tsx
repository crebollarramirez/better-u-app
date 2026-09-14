import { SignIn } from "@clerk/nextjs";

export default function SignInRoute() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
