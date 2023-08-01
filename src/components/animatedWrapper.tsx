'use client'
import React, { useEffect, useRef, ReactNode } from 'react';

type AnimatedComponentProps = {
    children: ReactNode;
    animationClass: string;
    delay?: string;
    threshold?: number;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ children, animationClass, delay = `0s`, threshold = 0.5 }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Add animation class when element is in the viewport
                if (entry.isIntersecting && ref.current) {
                    ref.current.classList.add(animationClass);
                }
            },
            {
                root: null,
                rootMargin: `0px`,
                threshold: threshold
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [animationClass, threshold]);

    return (
        <div ref={ref} style={{ animationDelay: delay }} className="transition-opacity duration-2000">
            {children}
        </div>
    );
}

export default AnimatedComponent;
