"use client";
import { ReactNode } from "react";
import { Button } from "./ui/button";

export function GradientBtn({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r p-[1px] mt-2 from-primary to-secondary rounded-md">
      <Button className="bg-background ">
        <GradientText>{children}</GradientText>
      </Button>
    </div>
  );
}
export function GradientText({ children }: { children: ReactNode }) {
  return (
    <p className="underline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      {children}
    </p>
  );
}
