"use client";
import React, { useEffect, useRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type AnimatedComponentProps = {
  children: ReactNode;
  animationClass: string;
  delay?: string;
  threshold?: number;
  className?: string;
};

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  children,
  animationClass,
  delay = `0s`,
  threshold = 0.5,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add animation class when element is in the viewport
        if (entry.isIntersecting && ref.current) {
          animationClass.split(` `).map((c) => ref.current?.classList.add(c));
        }
      },
      {
        root: null,
        rootMargin: `0px`,
        threshold: threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    const { current } = ref;
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [animationClass, threshold]);

  return (
    <div
      ref={ref}
      style={{ animationDelay: delay }}
      className={twMerge(`transition-opacity `, className)}
    >
      {children}
    </div>
  );
};

export default AnimatedComponent;
