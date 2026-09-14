import { UserButton } from "@clerk/nextjs";

export function UserNav() {
  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonOuterIdentifier: {
            color: "var(--foreground)",
          },
        },
      }}
    />
  );
}
