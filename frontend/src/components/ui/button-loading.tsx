import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface ButtonLoadingProps {
  children?: ReactNode;
}

export function ButtonLoading({ children }: ButtonLoadingProps) {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      {children}
    </Button>
  )
}