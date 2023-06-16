"use client";

import { DocResponse } from "@/services/api";

export interface Message {
  id?: number;
  message: string;
  type: string;
  timestamp: Date;
  sources?: DocResponse[];
}
