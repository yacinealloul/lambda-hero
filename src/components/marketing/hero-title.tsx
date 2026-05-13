import { FontSwap } from "@/components/effects/font-swap";

export function HeroTitle() {
  return (
    <h1 className="lambda-h1-large relative">
      <span className="sr-only">The Superintelligence Cloud</span>
      <span aria-hidden="true">
        The{" "}
        <span className="whitespace-nowrap">
          Superint<FontSwap char="e" />lligenc<FontSwap char="e" />
        </span>
        <br />
        <FontSwap char="C" />loud
      </span>
    </h1>
  );
}
