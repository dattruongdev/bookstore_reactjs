import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

type Props = {
  // React element being forwardRef element like TopFeedbacks
  Component: React.ForwardRefExoticComponent<any>;
  className?: string;
};

export default function Carousel({ Component, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  // States to track if buttons should be disabled

  // Helper function to update button states based on scroll position

  // Effect to check if buttons should be disabled after every scroll or resize

  const prev = () => {
    requestAnimationFrame(() => {
      if (ref.current === null) return;

      const scrollLeft = ref.current.scrollLeft;
      const itemWidth = parseInt(
        getComputedStyle(ref.current.children[0]).width
      );
      ref.current.scrollLeft = scrollLeft - itemWidth * 3;
    });
  };

  const next = () => {
    requestAnimationFrame(() => {
      if (ref.current === null) return;

      const scrollLeft = ref.current.scrollLeft;
      const itemWidth = parseInt(
        getComputedStyle(ref.current.children[0]).width
      );
      ref.current.scrollLeft = scrollLeft + itemWidth * 3;
    });
  };

  return (
    <div className={cn("relative", className)}>
      <Component prevClick={prev} nextClick={next} ref={ref} />
    </div>
  );
}
