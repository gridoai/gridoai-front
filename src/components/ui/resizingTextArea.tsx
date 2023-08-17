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

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = `0px`;
    const scrollHeight = textareaRef.current.scrollHeight;
    onChangeHeight?.(scrollHeight);
    textareaRef.current.style.height = scrollHeight + `px`;
  }, [onChangeHeight, props.value]);

  return (
    <textarea
      ref={textareaRef}
      style={style}
      {...props}
      value={props.value}
      onChange={(e) => {
        props.onChange?.(e);
      }}
    />
  );
};
