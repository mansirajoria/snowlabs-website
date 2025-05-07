import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  return null;
} 