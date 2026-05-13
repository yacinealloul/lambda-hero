export function CtaButtons() {
  return (
    <div className="lambda-container relative z-10">
      <div
        className="flex flex-wrap justify-center gap-5 mt-[50px]"
        data-align="center"
      >
        <a href="/sign-up" className="lambda-btn" aria-label="Launch GPU instance">
          Launch GPU instance
        </a>
        <a
          href="/talk-to-our-team"
          className="lambda-btn lambda-btn--secondary"
          aria-label="Talk to our team"
        >
          Talk to our team
        </a>
      </div>
    </div>
  );
}
