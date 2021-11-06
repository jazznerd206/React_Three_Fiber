import { useEffect, useState } from "react";

export const useResize = () => {
  const [size, setSize] = useState({ height: window.innerHeight, width: window.innerWidth });

  useEffect(() => {
    const setFromEvent = (e) => {
      setSize({ height: window.innerHeight, width: window.innerWidth });
    }
    window.addEventListener("resize", setFromEvent);
    return () => {
      window.removeEventListener("resize", setFromEvent);
    };
  }, []);

  return { size };
};