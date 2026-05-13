/**
 * Fixed right-edge rail: small terminal icon + vertical "// Lambda Agent Terminal //"
 */
export function AgentTerminalRail() {
  return (
    <aside
      aria-hidden="true"
      className="hidden lg:flex pointer-events-none fixed right-0 top-0 z-50 h-screen w-[40px] flex-col items-center border-l border-[color:var(--color-neutral-800,#262625)] bg-black"
    >
      <div className="mt-[18px] flex h-[28px] w-[28px] items-center justify-center">
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect
            x="0.6"
            y="0.6"
            width="16.8"
            height="12.8"
            stroke="#e7e6d9"
            strokeWidth="1.1"
          />
          <line
            x1="0.6"
            y1="4.2"
            x2="17.4"
            y2="4.2"
            stroke="#e7e6d9"
            strokeWidth="1.1"
          />
          <circle cx="2.6" cy="2.4" r="0.55" fill="#e7e6d9" />
          <circle cx="4.6" cy="2.4" r="0.55" fill="#e7e6d9" />
          <circle cx="6.6" cy="2.4" r="0.55" fill="#e7e6d9" />
        </svg>
      </div>
      <div
        className="mt-6 select-none whitespace-nowrap text-[11px] tracking-[0.22em] text-[color:var(--color-neutral-300,#b0afa6)]"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontFamily: "var(--font-suisse-mono)",
        }}
      >
        // LAMBDA AGENT TERMINAL //
      </div>
    </aside>
  );
}
