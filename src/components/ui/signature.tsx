import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const signatureVariants = cva(
  "inline-flex items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 hover:border-solid hover:shadow-md transform hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary",
        secondary:
          "border-secondary/30 bg-secondary/5 hover:bg-secondary/10 hover:border-secondary",
        accent:
          "border-accent/30 bg-accent/5 hover:bg-accent/10 hover:border-accent",
        muted:
          "border-muted/30 bg-muted/5 hover:bg-muted/10 hover:border-muted",
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
      data-slot="signature"
      className={cn(signatureVariants({ variant, size, className }))}
      {...props}
    >
      <span
        className="font-signature text-foreground/90 break-words italic text-2xl lg:text-4xl"
        style={{ fontFamily: "Brush Script MT, cursive, handwriting" }}
      >
        {name}
      </span>
    </div>
  );
}

export { Signature };
