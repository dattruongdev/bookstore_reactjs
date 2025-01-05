"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../lib/utils";

const DualThumbSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {[0, 1].map((index) => (
      <SliderPrimitive.Thumb
        key={index}
        className="relative block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {/* <div className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-primary px-1 py-0.5 text-xs text-primary-foreground opacity-0 transition-opacity data-[show=true]:opacity-100 text-blue">
        </div> */}
        <div
          className={cn(
            "absolute left-0 -translate-x-1/2 ",
            index === 0
              ? "top-full translate-y-1/2"
              : "bottom-full -translate-y-1/2"
          )}
        >
          {props.value?.[index].toLocaleString("it-IT")}
        </div>
      </SliderPrimitive.Thumb>
    ))}
  </SliderPrimitive.Root>
));
DualThumbSlider.displayName = SliderPrimitive.Root.displayName;

export default DualThumbSlider;
