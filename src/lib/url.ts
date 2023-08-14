import { headers } from "next/headers";

export const currentUrl = () => new URL(headers().get(`x-url`) || `/`);
