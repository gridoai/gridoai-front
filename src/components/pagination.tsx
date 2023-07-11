"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Pagination({
  pageSize = 10,
  current = 1,
  pageCount,
  onPageChange,
  onPageSizeChange,
}: {
  pageSize?: number;
  current?: number;
  pageCount: number;
  onPageChange: (current: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}) {
  const hasNext = current < pageCount;
  const hasPrev = current > 1;
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2">
        <Button onClick={() => onPageChange(1)} disabled={!hasPrev}>
          First
        </Button>
        <Button onClick={() => onPageChange(current - 1)} disabled={!hasPrev}>
          Previous
        </Button>
        <Button onClick={() => onPageChange(current + 1)} disabled={!hasNext}>
          Next
        </Button>
        <Button onClick={() => onPageChange(pageCount)} disabled={!hasNext}>
          Last
        </Button>
      </div>
      <span className="whitespace-nowrap">
        Page {current} of {pageCount}
      </span>

      <Select onValueChange={(s) => onPageSizeChange(Number(s))}>
        <SelectTrigger className="max-w-[70px]">
          <SelectValue>{pageSize}</SelectValue>
        </SelectTrigger>
        <SelectContent className="max-w-[50px]">
          <SelectGroup>
            {[10, 20, 30, 40, 50].map((size) => (
              <SelectItem
                key={size}
                value={size.toString()}
                onClick={() => onPageSizeChange(size)}
              >
                Show {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
