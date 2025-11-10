import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function InitAOS() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      offset: 120,
    });
  }, []);
  return null;
}
