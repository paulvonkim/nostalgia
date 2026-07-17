import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { DitherReveal } from "@/components/DitherReveal/DitherReveal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <div className={styles.hero}>
      <DitherReveal
        className={styles.portrait}
        defaultSrc="/images/paul/profile_default.png"
        hoverSrc="/images/paul/profile_hover.png"
        alt="Portrait of Paul Kim"
        width={750}
        height={855}
        sizes="260px"
        priority
      />
      <div className={styles.copy}>
        <h1 className={styles.wordmark}>
          {/* Pre-rendered from the real Gossip Med Square font (see
           * scripts intent in commit history / design.md §5) rather than
           * live text: -webkit-font-smoothing/font-smooth CSS get silently
           * ignored by WebKit on Retina displays at normal zoom, so live
           * text stayed blurry no matter what we set. A baked bitmap +
           * image-rendering: pixelated is immune to that — it's just
           * pixels, not something the OS text rasterizer gets a vote on. */}
          <Image
            src="/images/home/wordmark.png"
            alt="Paul Kim"
            width={671}
            height={177}
            unoptimized
            priority
            className={styles.wordmarkImg}
          />
        </h1>
        <p className={styles.pitch}>
          I create experiences built on research, driven by people, and shaped
          by over a decade translating complexity into systems that work.
        </p>
        <div className={styles.cta}>
          <Button href="/work">View My Work →</Button>
        </div>
      </div>
    </div>
  );
}
