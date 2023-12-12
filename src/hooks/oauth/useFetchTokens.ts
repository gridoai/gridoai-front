import { authGoogleDrive } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useFetchTokens = () => {
  const mutationResult = useMutation(
    [`googleDriveAuth`],
    async (code: string) =>
      authGoogleDrive({
        code,
        redirectUri: `${window.location.origin}/documents`,
      })
  );
  
  return {
    fetchTokensByCode: mutationResult.mutateAsync,
    tokenApiResponse: mutationResult.data,
  };
};
