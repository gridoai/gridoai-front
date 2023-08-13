"use client";

import React, { useEffect, useRef, useState } from "react";
const defaultStyle = {
  display: `block`,
  overflow: `hidden`,
  resize: `none`,
  width: `100%`,
} as const;

export const AutoHeightTextarea = ({
  style = defaultStyle,
  ...props
}: React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = useState(``); // you can manage data with it

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = `0px`;
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + `px`;
  }, [currentValue]);

  return (
    <textarea
      ref={textareaRef}
      style={style}
      {...props}
      value={currentValue}
      onChange={(e) => {
        setCurrentValue(e.target.value);
        props.onChange?.(e);
      }}
    />
  );
};
