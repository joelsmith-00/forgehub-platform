import { useEffect } from "react";

/**
 * Attaches an IntersectionObserver that adds `.in` to every element with
 * class `.reveal` inside the given root (defaults to document) as it scrolls
 * into view. Pair with the keyframes defined in `src/styles.css`.
 */
export function useReveal(rootSelector: string = "body") {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.querySelector(rootSelector) ?? document.body;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootSelector]);
}
