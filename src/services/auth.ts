/* eslint-disable quotes */
import { auth } from "@clerk/nextjs";

declare global {
  interface Window {
    cookieStore: {
      getAll: () => Promise<{ name: string; value: string }[]>;
    };
  }
}
export const getTokenFromCookie = (): string | null =>
  Object.fromEntries(
    document.cookie.split(`;`).map((x) => x.split(`=`)?.map((x) => x.trim()))
  )?.__session;

export const getToken = async () => {
  console.log(typeof window, "TYPEOF WINDOW");
  try {
    if (typeof window === "undefined") {
      console.log(`no window`);
      return auth().getToken();
    }

    const fromCookie = getTokenFromCookie();

    console.log(parseJwt(fromCookie || ``));
    if (fromCookie) {
      return fromCookie;
    }
    if (!window.Clerk.session) {
      await window.Clerk.load();
    }
    return await window.Clerk.session.getToken();
  } catch {
    if (!window.Clerk?.session) {
      await window.Clerk?.load();
    }
    return await window.Clerk.session.getToken();
  }
};
export function parseJwt<T>(token: string): T {
  if (!token) {
    return {} as T;
  }
  if (typeof window !== `undefined`) {
    const base64Url = token.split(`.`)[1];
    const base64 = base64Url.replace(/-/g, `+`).replace(/_/g, `/`);
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split(``)
        .map(function (c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join(``)
    );

    return JSON.parse(jsonPayload);
  }
  return JSON.parse(Buffer.from(token.split(`.`)[1], `base64`).toString());
}
export type Plan = `free` | `starter` | `pro` | `enterprise` | `individual`;

type SessionTokenData = {
  orgPlan?: Plan;
  userPlan?: Plan;
};

export const getPublicData = async () => {
  const token = await getToken();
  if (!token) return {};
  const data = parseJwt<SessionTokenData>(token);
  console.log(`public data:`, data);
  return {
    plan: data.orgPlan || data.userPlan,
  };
};
