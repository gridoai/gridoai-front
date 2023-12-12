import { useToast } from "@/components/use-toast";
import { useScopedI18n } from "@/locales/client";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import { useEffect, useRef } from "react";

export const useOAuthRedirect = ({
  handleCode,
}: {
  handleCode: (code: string) => Promise<[string, string]>;
}) => {
  const t = useScopedI18n(`gdrive`);
  const { toast } = useToast();

  const params = useSearchParams();

  const initialized = useRef(false);
  const codeParam = params?.get(`code`);

  const { user } = useUser();

  const failedToAuthMsg = t(`failedToAuthenticate`);
  const successfullyAuthenticatedMsg = t(`successfullyAuthenticated`);

  const isInAuthFlow = !!(
    codeParam && !user?.publicMetadata.googleDriveAccessToken
  );
  useEffect(() => {
    if (!initialized.current && isInAuthFlow) {
      initialized.current = true;

      (async () => {
        try {
          await handleCode(codeParam);
          toast({ title: successfullyAuthenticatedMsg });
          router.replace(`/documents`);
        } catch (e) {
          console.error(`Failed to authenticate with Google Drive`, e);
          toast({ title: failedToAuthMsg });
        }
      })();
    }
  }, [
    codeParam,
    failedToAuthMsg,
    handleCode,
    isInAuthFlow,
    successfullyAuthenticatedMsg,
    toast,
  ]);
};
