import { gsap } from "gsap";

/**
 * Splits text into individual characters while preserving inner HTML structure (e.g., spans with gradients)
 * Optimized with fragments and idempotency checks
 */
export const splitText = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    if (el.dataset.split) return;
    el.dataset.split = "true";

    const processNode = (node) => {
      if (node.nodeType === 3) {
        // Text node
        const text = node.textContent;
        const fragment = document.createDocumentFragment();
        const parent = node.parentNode;

        // Check if we are inside a gradient/styled span
        const hasGradient =
          parent &&
          parent.classList &&
          parent.classList.contains("bg-clip-text");
        const gradientClasses = hasGradient ? Array.from(parent.classList) : [];

        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.cssText =
            "display: inline-block; will-change: transform, opacity;";
          span.classList.add("char");

          if (hasGradient) {
            span.classList.add(...gradientClasses);
          }

          fragment.appendChild(span);
        });
        node.parentNode?.replaceChild(fragment, node);
      } else if (node.nodeType === 1) {
        // Element node
        Array.from(node.childNodes).forEach(processNode);
      }
    };

    Array.from(el.childNodes).forEach(processNode);
  });
};

/**
 * Splits text into masked characters while preserving HTML
 */
export const splitTextMask = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    if (el.dataset.maskSplit) return;
    el.dataset.maskSplit = "true";

    /** @param {Node} node */
    const processNode = (node) => {
      if (node.nodeType === 3) {
        // Text node
        const text = node.textContent;
        const fragment = document.createDocumentFragment();
        const parent = node.parentNode;

        // Check if we are inside a gradient/styled span
        const hasGradient =
          parent &&
          parent.classList &&
          parent.classList.contains("bg-clip-text");
        const gradientClasses = hasGradient ? Array.from(parent.classList) : [];

        text.split("").forEach((char) => {
          const outer = document.createElement("span");
          outer.style.cssText =
            "display: inline-block; overflow: hidden; vertical-align: top; will-change: transform;";
          outer.classList.add("char-outer");

          const inner = document.createElement("span");
          inner.textContent = char === " " ? "\u00A0" : char;
          inner.style.cssText =
            "display: inline-block; will-change: transform;";
          inner.classList.add("char-inner");

          if (hasGradient) {
            inner.classList.add(...gradientClasses);
          }

          outer.appendChild(inner);
          fragment.appendChild(outer);
        });
        node.parentNode?.replaceChild(fragment, node);
      } else if (node.nodeType === 1) {
        // Element node
        Array.from(node.childNodes).forEach(processNode);
      }
    };

    Array.from(el.childNodes).forEach(processNode);
  });
};

/**
 * Adds magnetic effect to elements
 * Optimized with force3D and snappier easing
 */
export const initMagnetic = (selector) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    // Force GPU acceleration from start
    el.style.willChange = "transform";

    el.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(el, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.4,
        force3D: true,
        ease: "power2.out",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        force3D: true,
        ease: "elastic.out(1, 0.5)",
      });
    });
  });
};
