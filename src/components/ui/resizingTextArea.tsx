"use client";

import React, { useEffect, useRef, useState } from "react";

export const maxResizableInputHeight = 180;
const defaultStyle = {
  display: `block`,
  overflow: `hidden`,
  resize: `none`,

  width: `100%`,
  maxHeight: `${maxResizableInputHeight}px`,
} as const;
export const AutoHeightTextarea = ({
  style = defaultStyle,
  onChangeHeight,
  ...props
}: React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  onChangeHeight?: (height: number) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = useState(``); // you can manage data with it

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = `0px`;
    const scrollHeight = textareaRef.current.scrollHeight;
    onChangeHeight?.(scrollHeight);
    textareaRef.current.style.height = scrollHeight + `px`;
  }, [currentValue, onChangeHeight]);

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
