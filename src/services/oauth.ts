export const isTokenValid = (token: string) =>
  fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
  ).then((res) => res.ok);
