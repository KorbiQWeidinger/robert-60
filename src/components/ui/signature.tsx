import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const signatureVariants = cva(
  "inline-flex items-center justify-center transition-all duration-300 transform hover:scale-105",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        accent: "",
        muted: "",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        default: "px-5 py-3 text-base",
        lg: "px-6 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type SignatureProps = React.ComponentProps<"div"> &
  VariantProps<typeof signatureVariants> & {
    name: string;
  };

function Signature({
  className,
  variant,
  size,
  name,
  ...props
}: SignatureProps) {
  return (
    <div
      className={cn(signatureVariants({ variant, size, className }))}
      {...props}
    >
      <span
        className="break-words italic text-3xl lg:text-4xl"
        style={{ fontFamily: "Brush Script MT, cursive, handwriting" }}
      >
        {name}
      </span>
    </div>
  );
}

export { Signature };
