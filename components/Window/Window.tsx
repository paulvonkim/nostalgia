"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent as ReactTransitionEvent,
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

// Matches the max-width: 1024px queries in Window.module.css (drag
// disabled, forced full-width, native scroll) — see styles/tokens.css
// for the documented breakpoint reference this number comes from.
const DRAG_DISABLED_QUERY = "(max-width: 1024px)";

// How much of the title bar must stay on-screen at any edge, so a dragged
// window can never get lost off-screen — generous enough to comfortably
// grab back, not just technically visible.
const EDGE_MARGIN = 100;

// Floor for the resize handle — small enough to feel deliberate, not so
// small the title bar's own contents (flanks + title text) start
// overlapping or wrapping.
const GROW_MIN_WIDTH = 480;
const GROW_MIN_HEIGHT = 320;

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

interface ResizeState {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startWidth: number;
  startHeight: number;
  maxWidth: number;
  maxHeight: number;
}

export function Window({
  title,
  children,
  size,
  scrollbar = true,
}: WindowProps) {
  const pathname = usePathname();
  const router = useRouter();
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentSizeRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const resizeRef = useRef<ResizeState | null>(null);
  const [scroll, setScroll] = useState<ScrollState>(NO_OVERFLOW);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [customSize, setCustomSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Dragging is meant to persist while you're on a page, but each new
  // route (Work, About, a case study, Home...) should start centered
  // rather than carrying over wherever the window was left. This also
  // covers first mount, since effects run once regardless of deps.
  // Resize customization resets the same way, for the same reason.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not used in the body
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    setCustomSize(null);
  }, [pathname]);

  // Covers the one case the pointerdown guard below can't: a window
  // already dragged off-center on desktop, then the viewport resized
  // down to ≤1024px without a page reload (e.g. rotating a tablet, or a
  // narrowed browser window) — without this, the stale drag offset would
  // keep applying even though new drags are now blocked. Checked on
  // mount too (not just on change), so a page that loads directly at
  // ≤1024px starts at {0,0} rather than relying on the initial state
  // already happening to be that by coincidence. Same reasoning covers a
  // stale custom resize.
  useEffect(() => {
    const mql = window.matchMedia(DRAG_DISABLED_QUERY);
    function syncPosition(query: MediaQueryList | MediaQueryListEvent) {
      if (query.matches) {
        setPosition({ x: 0, y: 0 });
        setCustomSize(null);
      }
    }
    syncPosition(mql);
    mql.addEventListener("change", syncPosition);
    return () => mql.removeEventListener("change", syncPosition);
  }, []);

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
    // Checked live at the moment a drag would start, not via a stored
    // isDraggable state — a plain matchMedia().matches read here is
    // always accurate for whatever the viewport is right now, with no
    // extra state/listener needed just for this one branch (the effect
    // above still exists, but only to reset an existing stale offset,
    // not to gate this).
    if (window.matchMedia(DRAG_DISABLED_QUERY).matches) return;
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

  function handleGrowPointerDown(e: ReactPointerEvent<HTMLButtonElement>) {
    if (e.button !== 0 || !outerRef.current || !innerRef.current) return;
    // Same guard as handlePointerDown — disabled below 1024px, same
    // breakpoint drag already respects.
    if (window.matchMedia(DRAG_DISABLED_QUERY).matches) return;
    const rect = outerRef.current.getBoundingClientRect();
    const innerRect = innerRef.current.getBoundingClientRect();
    resizeRef.current = {
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startWidth: innerRect.width,
      startHeight: innerRect.height,
      // Clearance relative to the window's actual current on-screen
      // position (rect.left/top), not the viewport center — matches the
      // drag handler's own EDGE_MARGIN idiom above.
      maxWidth: window.innerWidth - EDGE_MARGIN - rect.left,
      maxHeight: window.innerHeight - EDGE_MARGIN - rect.top,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handleGrowPointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    const resize = resizeRef.current;
    if (!resize || resize.pointerId !== e.pointerId) return;

    const dx = e.clientX - resize.startClientX;
    const dy = e.clientY - resize.startClientY;

    const nextWidth = clamp(
      resize.startWidth + dx,
      GROW_MIN_WIDTH,
      resize.maxWidth,
    );
    const nextHeight = clamp(
      resize.startHeight + dy,
      GROW_MIN_HEIGHT,
      resize.maxHeight,
    );

    setCustomSize({ width: nextWidth, height: nextHeight });
  }

  function handleGrowPointerUp(e: ReactPointerEvent<HTMLButtonElement>) {
    if (resizeRef.current?.pointerId === e.pointerId) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      resizeRef.current = null;
    }
  }

  // prefers-reduced-motion skips straight to navigating — .closing's own
  // transition is also neutralized under the same query (Window.module.css)
  // as a belt-and-suspenders backstop, but this is what actually avoids
  // running the animation in the first place.
  function handleClose() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      router.push("/");
      return;
    }
    setIsClosing(true);
  }

  // .closing animates both transform and opacity (Window.module.css) —
  // guarded to transform specifically so this only fires once per close,
  // not once per animated property.
  function handleInnerTransitionEnd(e: ReactTransitionEvent<HTMLDivElement>) {
    if (isClosing && e.propertyName === "transform") {
      router.push("/");
    }
  }

  return (
    <div
      className={styles.outer}
      ref={outerRef}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div
        className={`${styles.inner} ${size ? SIZE_CLASS[size] : ""} ${isClosing ? styles.closing : ""}`}
        ref={innerRef}
        style={
          customSize
            ? { width: customSize.width, height: customSize.height }
            : undefined
        }
        onTransitionEnd={handleInnerTransitionEnd}
      >
        <div
          className={`${styles.titleBar} ${isDragging ? styles.dragging : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {pathname !== "/" && (
            <button
              type="button"
              className={styles.closeBox}
              aria-label="Close"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleClose}
            />
          )}
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
        <button
          type="button"
          className={styles.growBox}
          aria-label="Resize window"
          onPointerDown={handleGrowPointerDown}
          onPointerMove={handleGrowPointerMove}
          onPointerUp={handleGrowPointerUp}
          onPointerCancel={handleGrowPointerUp}
        />
      </div>
    </div>
  );
}
