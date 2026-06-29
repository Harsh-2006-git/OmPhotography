"use client";

import React, { ElementType } from "react";
import { motion, Variants } from "framer-motion";

interface TimelineContentProps {
  children: React.ReactNode;
  as?: ElementType;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLDivElement | null>;
  customVariants?: Variants;
  className?: string;
  id?: string;
}

export const TimelineContent = ({
  children,
  as: Component = "div",
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  ...props
}: TimelineContentProps) => {
  const MotionComponent = (motion as any)[Component as string] || motion.div;

  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: animationNum * 0.1 } },
  };

  const variants = customVariants || defaultVariants;

  return (
    <MotionComponent
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      custom={animationNum}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
