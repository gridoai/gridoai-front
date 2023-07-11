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
  pageSize: initialPageSize = 10,
  current: initialCurrent = 1,
  pageCount,
  onPageChange,
}: {
  pageSize?: number;
  current?: number;
  pageCount: number;
  onPageChange: (page: { current: number; pageSize: number }) => void;
}) {
  const [current, setCurrent] = useState(initialCurrent);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const hasNext = current < pageCount;
  const hasPrev = current > 1;
  console.log({ pageSize, current });
  const handleSetCurrent = (value: number) => {
    setCurrent(value);
    onPageChange({ current: value, pageSize });
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    onPageChange({ current, pageSize: value });
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2">
        <Button onClick={() => handleSetCurrent(1)} disabled={!hasPrev}>
          First
        </Button>
        <Button
          onClick={() => handleSetCurrent(current - 1)}
          disabled={!hasPrev}
        >
          Previous
        </Button>
        <Button
          onClick={() => handleSetCurrent(current + 1)}
          disabled={!hasNext}
        >
          Next
        </Button>
        <Button onClick={() => handleSetCurrent(pageCount)} disabled={!hasNext}>
          Last
        </Button>
      </div>
      <span className="whitespace-nowrap">
        Page {current} of {pageCount}
      </span>

      <Select onValueChange={(s) => setPageSize(Number(s))}>
        <SelectTrigger className="max-w-[70px]">
          <SelectValue>{pageSize}</SelectValue>
        </SelectTrigger>
        <SelectContent className="max-w-[50px]">
          <SelectGroup>
            {[10, 20, 30, 40, 50].map((size) => (
              <SelectItem
                key={size}
                value={size.toString()}
                onClick={() => handlePageSizeChange(size)}
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
