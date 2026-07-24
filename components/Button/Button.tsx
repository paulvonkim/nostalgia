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

// CTA button, site-wide — one style, no variants, identical in both
// themes. Classic Mac beveled button (see Button.module.css) — no outer
// ring wrapper; hover/active feedback is a property change directly on
// the button itself (background + bevel direction), per the reference
// this was rebuilt from.
export function Button({ children, className, href, ...rest }: ButtonProps) {
  const classes = `${styles.button} ${className ?? ""}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
