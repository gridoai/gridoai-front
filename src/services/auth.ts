declare global {
  interface Window {
    cookieStore: {
      getAll: () => Promise<{ name: string; value: string }[]>;
    };
  }
}

export const getToken = async () => {
  if (typeof window === `undefined`) {
    return;
  }

  const fromCookie = (await window.cookieStore.getAll()).find(
    (c) => c.name === `__session`
  );
  console.log(parseJwt(fromCookie?.value ?? ``));
  return fromCookie?.value ?? (await window.Clerk.session.getToken());
};

function parseJwt<T>(token: string): T {
  if (typeof window !== `undefined`) {
    var base64Url = token.split(`.`)[1];
    var base64 = base64Url.replace(/-/g, `+`).replace(/_/g, `/`);
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split(``)
        .map(function (c) {
          return `%` + (`00` + c.charCodeAt(0).toString(16)).slice(-2);
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