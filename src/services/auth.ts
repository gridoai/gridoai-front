import { auth } from "@clerk/nextjs";

declare global {
  interface Window {
    cookieStore: {
      getAll: () => Promise<{ name: string; value: string }[]>;
    };
  }
}
const getTokenFromCookie = (): string | null =>
  Object.fromEntries(
    document.cookie.split(`;`).map((x) => x.split(`=`)?.map((x) => x.trim()))
  )?.__session;

export const getToken = async () => {
  try {
    if (typeof window === `undefined`) {
      return auth().getToken();
    }

    const fromCookie = getTokenFromCookie();

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
function parseJwt<T>(token: string): T {
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
export type Plan = `free` | `pro` | `enterprise`;
type PublicJWTData = {
  meta: {
    plan?: Plan;
  };
};

export const getPublicData = async () =>
  parseJwt<PublicJWTData>((await getToken()) || ``).meta;
