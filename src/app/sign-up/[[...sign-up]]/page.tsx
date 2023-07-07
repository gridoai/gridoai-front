import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <SignUp />
    </div>
  );
}
export const runtime = "edge";
