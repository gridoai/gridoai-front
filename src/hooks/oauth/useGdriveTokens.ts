import { refreshDriveToken } from "@/services/api";
import { isTokenValid } from "@/services/oauth";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const useRefreshGdriveTokens = () => {
  const { user } = useUser();

  const accessToken = user?.publicMetadata.googleDriveAccessToken;
  const refreshToken = user?.publicMetadata.googleDriveRefreshToken;

  const { data: token, isLoading: tokenValidityLoading } = useQuery(
    [`googleDriveAccessTokenStillValid`, accessToken],
    async () => {
      if (typeof accessToken === `string`) {
        const tokenValid = await isTokenValid(accessToken);
        if (tokenValid) return accessToken;

        if (typeof refreshToken === `string`)
          return (await refreshDriveToken(refreshToken))?.[0];
      }
    },
    { enabled: !!accessToken }
  );
  return {
    token,
    tokenValidityLoading,
  };
};
