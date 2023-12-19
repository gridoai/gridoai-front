import axios from "axios";

export const isTokenValid = (token: string) =>
  axios
    .get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      {
        timeout: 5000,
      }
    )
    .then((res) => res.status === 200)
    .catch(() => false);
