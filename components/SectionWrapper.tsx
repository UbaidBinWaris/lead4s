import type { ReactNode } from "react";

type SectionWrapperProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function SectionWrapper({
  id,
  className,
  children,
}: Readonly<SectionWrapperProps>) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
