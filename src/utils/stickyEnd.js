/**
 * stickyEnd
 * ScrollTrigger `end` for a section whose frame is CSS-sticky (top: 0) inside a taller runway.
 * The scrubbed timeline then ends exactly where the browser releases the sticky frame, measured
 * from the frame itself rather than window.innerHeight, which changes while a mobile browser's
 * toolbar collapses or expands. Re-evaluated on every ScrollTrigger refresh.
 */
export function stickyEnd(section, frame) {
  return () => `+=${Math.max(1, section.offsetHeight - frame.offsetHeight)}`;
}
