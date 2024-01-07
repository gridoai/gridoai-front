import axios from "axios";
export type TokenInfo = {
  issued_to: string;
  audience: string;
  scope: string;
  expires_in: number;
  access_type: string;
};

export const getTokenInfo = (token: string) =>
  axios
    .get<TokenInfo>(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      {
        timeout: 5000,
      }
    )
    .catch(console.error);
