import { SignIn } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <SignIn redirectUrl={`/chat`} />
    </div>
  );
}
export const runtime = `nodejs`;
