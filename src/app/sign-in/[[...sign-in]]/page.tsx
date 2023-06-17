import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <SignIn
        appearance={{
          variables: {
            colorBackground: "#141619",
            colorText: "white",
          },
          elements: {
            socialButtonsIconButton: {
              borderColor: "#30373d",
              backgroundColor: "#141619",
              borderRadius: "0.5rem",
              color: "white",
            },
          },
        }}
      />
    </div>
  );
}
