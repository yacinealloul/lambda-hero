export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="lambda-eyebrow relative inline-block text-center font-semibold mb-5"
      style={{
        color: "var(--color-shell)",
        fontFamily: "var(--font-suisse)",
        lineHeight: "120%",
        textOverflow: "ellipsis",
        textWrapStyle: "pretty",
      } as React.CSSProperties}
    >
      {children}
    </p>
  );
}
