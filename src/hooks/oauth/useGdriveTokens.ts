import { refreshDriveToken } from "@/services/api";
import { isTokenValid } from "@/services/oauth";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const useRefreshGdriveTokens = () => {
  const { user } = useUser();
  const { data: token, isLoading: tokenValidityLoading } = useQuery(
    [
      `googleDriveAccessTokenStillValid`,
      user?.publicMetadata.googleDriveAccessToken,
    ],
    async () => {
      if (typeof user?.publicMetadata.googleDriveAccessToken === `string`) {
        const tokenValid = await isTokenValid(
          user?.publicMetadata.googleDriveAccessToken
        );
        if (tokenValid) {
          return user?.publicMetadata.googleDriveAccessToken;
        }
        if (typeof user?.publicMetadata.googleDriveRefreshToken === `string`)
          return (
            await refreshDriveToken(
              user?.publicMetadata.googleDriveRefreshToken
            )
          )[0];
      }
    },
    { enabled: !!user?.publicMetadata.googleDriveAccessToken }
  );
  return {
    token,
    tokenValidityLoading,
  };
};
