"use client";

import { usePathname } from "next/navigation";
import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Window.module.css";

interface WindowProps {
  title: string;
  children?: ReactNode;
  // Home has no fixed size — omitting this prop sizes the window
  // intrinsically to its content (max-width: min(1100px, 92vw) safety cap).
  size?: "impressum" | "case-study";
  // Home's window is content-intrinsic and essentially never overflows, so
  // the scrollbar chrome there is pure unused decoration — set false to
  // omit it. .content stays overflow: auto regardless (see Window.module.css),
  // so scrolling itself still works via wheel/trackpad in the rare case it's
  // ever needed; this only hides the visual arrow/track/thumb chrome.
  scrollbar?: boolean;
}

const SIZE_CLASS: Record<NonNullable<WindowProps["size"]>, string> = {
  impressum: styles.sizeImpressum,
  "case-study": styles.sizeCaseStudy,
};

interface ScrollState {
  hasOverflow: boolean;
  thumbHeightPct: number;
  thumbTopPct: number;
}

const NO_OVERFLOW: ScrollState = {
  hasOverflow: false,
  thumbHeightPct: 100,
  thumbTopPct: 0,
};

// Must stay below the fixed Navbar (Navbar.module.css height: 46px) so the
// window can never be dragged up behind it.
const NAVBAR_HEIGHT = 46;

// How much of the title bar must stay on-screen at any edge, so a dragged
// window can never get lost off-screen — generous enough to comfortably
// grab back, not just technically visible.
const EDGE_MARGIN = 100;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

interface DragState {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startLeft: number;
  startTop: number;
  startOffsetX: number;
  startOffsetY: number;
  width: number;
  height: number;
}

export function Window({
  title,
  children,
  size,
  scrollbar = true,
}: WindowProps) {
  const pathname = usePathname();
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentSizeRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [scroll, setScroll] = useState<ScrollState>(NO_OVERFLOW);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Dragging is meant to persist while you're on a page, but each new
  // route (Work, About, a case study, Home...) should start centered
  // rather than carrying over wherever the window was left. This also
  // covers first mount, since effects run once regardless of deps.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not used in the body
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [pathname]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    function measure() {
      if (!viewport) return;
      const { scrollHeight, clientHeight, scrollTop } = viewport;
      const hasOverflow = scrollHeight > clientHeight + 1;
      if (!hasOverflow) {
        setScroll(NO_OVERFLOW);
        return;
      }
      const thumbHeightPct = (clientHeight / scrollHeight) * 100;
      const maxScroll = scrollHeight - clientHeight;
      const scrollRatio = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScroll({
        hasOverflow: true,
        thumbHeightPct,
        thumbTopPct: scrollRatio * (100 - thumbHeightPct),
      });
    }

    measure();

    // A ResizeObserver on the viewport alone won't fire when its *content*
    // grows/shrinks without the viewport itself changing size (it's
    // bounded by overflow: auto) — observe the inner content wrapper too,
    // since that's the box that actually resizes as children change.
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    if (contentSizeRef.current) observer.observe(contentSizeRef.current);

    viewport.addEventListener("scroll", measure);
    return () => {
      observer.disconnect();
      viewport.removeEventListener("scroll", measure);
    };
  }, []);

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.button !== 0 || !outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    dragRef.current = {
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startLeft: rect.left,
      startTop: rect.top,
      startOffsetX: position.x,
      startOffsetY: position.y,
      width: rect.width,
      height: rect.height,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const dx = e.clientX - drag.startClientX;
    const dy = e.clientY - drag.startClientY;
    const proposedLeft = drag.startLeft + dx;
    const proposedTop = drag.startTop + dy;

    const minLeft = EDGE_MARGIN - drag.width;
    const maxLeft = window.innerWidth - EDGE_MARGIN;
    const minTop = NAVBAR_HEIGHT;
    const maxTop = window.innerHeight - EDGE_MARGIN;

    const clampedLeft = clamp(proposedLeft, minLeft, maxLeft);
    const clampedTop = clamp(proposedTop, minTop, maxTop);

    setPosition({
      x: drag.startOffsetX + (clampedLeft - drag.startLeft),
      y: drag.startOffsetY + (clampedTop - drag.startTop),
    });
  }

  function handlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === e.pointerId) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      dragRef.current = null;
      setIsDragging(false);
    }
  }

  return (
    <div
      className={styles.outer}
      ref={outerRef}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div className={`${styles.inner} ${size ? SIZE_CLASS[size] : ""}`}>
        <div
          className={`${styles.titleBar} ${isDragging ? styles.dragging : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <span className={styles.flank} aria-hidden="true" />
          <span className={styles.title}>{title}</span>
          <span className={styles.flank} aria-hidden="true" />
        </div>
        <div className={styles.body}>
          <div className={styles.content} ref={viewportRef}>
            <div ref={contentSizeRef}>{children}</div>
          </div>
          {scrollbar && (
            <div className={styles.scrollbar} aria-hidden="true">
              <span className={styles.arrowBtn}>▲</span>
              <span className={styles.track}>
                {scroll.hasOverflow && (
                  <span
                    className={styles.thumb}
                    style={{
                      height: `${scroll.thumbHeightPct}%`,
                      top: `${scroll.thumbTopPct}%`,
                    }}
                  />
                )}
              </span>
              <span className={styles.arrowBtn}>▼</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
