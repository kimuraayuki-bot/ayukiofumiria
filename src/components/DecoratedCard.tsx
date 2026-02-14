import type { ReactNode } from "react";

type DecoratedCardProps = {
  children: ReactNode;
  className?: string;
};

export function DecoratedCard({ children, className }: DecoratedCardProps) {
  return (
    <div className={`card-shadow relative ${className ?? ""}`}>
      <div className="relative rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 md:p-5">
        {children}
      </div>
    </div>
  );
}
