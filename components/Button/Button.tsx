import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// CTA button, site-wide — one style, no variants. Fixed border/radius and
// fixed fill, identical in both themes. Hover/active/focus feedback lives
// on an outer ring wrapper, never a property change on the button itself,
// so its own box never resizes. See Button.module.css.
export function Button({ children, className, href, ...rest }: ButtonProps) {
  const classes = `${styles.button} ${className ?? ""}`;

  const control = href ? (
    <a
      href={href}
      className={classes}
      {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </a>
  ) : (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );

  return <span className={styles.ringWrapper}>{control}</span>;
}
