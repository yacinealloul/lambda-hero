import { BackgroundAnimation } from "@/components/effects/background-animation";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { HeroTitle } from "@/components/marketing/hero-title";
import { CtaButtons } from "@/components/marketing/cta-buttons";

export function Hero() {
  return (
    <section
      id="section-home-hero"
      className="lambda-pt-xl lambda-pb-xl relative flex w-full flex-col items-center justify-center text-center"
      style={{
        backgroundColor: "var(--lambda-bg)",
        minHeight: "calc(100dvh - 100px)",
      }}
    >
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col items-center">
        <Eyebrow>Supercomputers for training and inference</Eyebrow>
        <HeroTitle />
        <CtaButtons />
      </div>
    </section>
  );
}
