import useDrivePicker from "react-google-drive-picker";
import { useOAuthRedirect } from "./useAuthRedirect";
import { useFetchTokens } from "./useFetchTokens";
import { useRefreshGdriveTokens } from "./useGdriveTokens";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/use-toast";
import { useScopedI18n } from "@/locales/client";
import { importGoogleDrive } from "@/services/api";
import { useCallback } from "react";
import { useCurrentPlanCapabilities } from "../useCurrentPlan";

export const useGdrivePicker = () => {
  const { fetchTokensByCode, tokenApiResponse } = useFetchTokens();
  useOAuthRedirect({ handleCode: fetchTokensByCode });
  const { token: refreshedToken, tokenValidityLoading } =
    useRefreshGdriveTokens();
  const [openPicker] = useDrivePicker();
  const t = useScopedI18n(`gdrive`);
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();

  const token = tokenApiResponse?.[0] || refreshedToken;
  const isAlreadyAuthenticated =
    typeof user?.publicMetadata.googleDriveAccessToken === `string` && token;

  const handleOpenPicker = useCallback(() => {
    if (
      !process.env.NEXT_PUBLIC_CLIENT_ID ||
      !process.env.NEXT_PUBLIC_API_KEY
    ) {
      console.error(
        `Missing NEXT_PUBLIC_CLIENT_ID or NEXT_PUBLIC_API_KEY env variables`
      );
      return;
    }

    if (typeof token !== `string` || !token) {
      const url = new URL(`https://accounts.google.com/o/oauth2/v2/auth`);

      const params = {
        scope: `https://www.googleapis.com/auth/drive.readonly`,
        access_type: `offline`,
        include_granted_scopes: `false`,
        state: `state_parameter_passthrough_value`,
        redirect_uri: `${window.location.origin}/documents`,
        response_type: `code`,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        prompt: `consent`,
      };

      url.search = new URLSearchParams(params).toString();
      return router.push(url.toString());
    }

    openPicker({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      developerKey: process.env.NEXT_PUBLIC_API_KEY,
      showUploadView: false,
      token,
      showUploadFolders: false,
      supportDrives: true,
      setSelectFolderEnabled: true,
      multiselect: true,
      setIncludeFolders: true,

      callbackFunction: async (data) => {
        if (data.action !== `picked`) {
          console.log(`User clicked cancel/close button`, data.action);
          return;
        }

        try {
          const ids = data.docs?.map((doc) => doc.id);
          toast({ title: t(`importingFiles`) });
          await importGoogleDrive(ids);
          toast({ title: t(`successfullyImported`) });
        } catch (e) {
          console.error(`Failed to import from Google Drive`, e);
          toast({ title: t(`failedToImport`) });
        }
      },
    });
  }, [openPicker, router, t, toast, token]);
  const planCapabilities = useCurrentPlanCapabilities();

  return {
    handleOpenPicker,
    token,
    tokenValidityLoading,
    isAlreadyAuthenticated,
    canAccessGdrive: planCapabilities.gdrive,
  };
};
