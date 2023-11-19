import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <SignIn signUpUrl="/sign-up" redirectUrl={`/chat`} />
    </div>
  );
}
