import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

const buttonVariants = cva(
  `transition-all min-h-[36px] gap-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: `text-primary-foreground `,
        destructive: `bg-destructive text-destructive-foreground hover:bg-destructive/90`,
        outline: `outline-double outline-1 outline-border  rounded-lg `,
        secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80`,
        ghost: `hover:bg-accent hover:text-accent-foreground`,
        link: `text-primary underline-offset-4 hover:underline`,
      },
      size: {
        default: `h-10 px-4 py-2`,
        sm: `h-9 rounded-md px-3`,
        lg: `h-11 rounded-lg px-8`,
        icon: `h-10 w-10`,
      },
    },
    defaultVariants: {
      variant: `default`,
      size: `default`,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : `button`;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? (
          <div className="animate-spin ">
            <CircleNotch />
          </div>
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = `Button`;

export { Button, buttonVariants };
