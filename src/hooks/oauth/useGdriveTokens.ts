import { refreshDriveToken } from "@/services/api";
import { getTokenInfo } from "@/services/oauth";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useRefreshGdriveTokens = () => {
  const { user } = useUser();

  const accessToken = user?.publicMetadata.googleDriveAccessToken;
  const refreshToken = user?.publicMetadata.googleDriveRefreshToken;

  const [expirationDate, setExpirationDate] = useState<number | undefined>();

  const {
    data: token,
    isLoading: tokenValidityLoading,
    refetch,
  } = useQuery(
    [`googleDriveAccessTokenStillValid`, accessToken],
    async () => {
      if (typeof accessToken === `string`) {
        const now = new Date().getTime() / 1000;
        const tokenResponse = await getTokenInfo(accessToken);

        if (tokenResponse?.status === 200) {
          setExpirationDate(tokenResponse.data.expires_in + now);
          return accessToken;
        }

        if (typeof refreshToken === `string`)
          return (await refreshDriveToken(refreshToken))?.[0];
      }
    },
    { enabled: !!accessToken, refetchInterval: 3_600_000 }
  );

  useEffect(() => {
    const now = new Date().getTime() / 1000;
    const didTokenExpired = expirationDate ? expirationDate <= now : false;
    if (didTokenExpired) {
      refetch();
    }
  }, [expirationDate, refetch]);

  return {
    token,
    tokenValidityLoading,
    refetchToken: refetch,
    expirationDate,
  };
};
