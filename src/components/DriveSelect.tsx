"use client";
import { authGoogleDrive, importGoogleDrive } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { Button } from "./ui/button";
import { GoogleDriveLogo } from "@phosphor-icons/react";
import { useToast } from "./use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTokenFromCookie, parseJwt } from "@/services/auth";
import { useScopedI18n } from "@/locales/client";

export const DriveSelect = () => {
  const [openPicker, authState] = useDrivePicker();
  const params = useSearchParams();
  const codeParam = params?.get(`code`);
  const t = useScopedI18n(`gdrive`);
  const { toast } = useToast();
  const router = useRouter();

  const initialized = useRef(false);

  const token = localStorage.getItem(`accessToken`);
  const isTokenValid =
    new Date(Number(localStorage.getItem(`expirationDate`)) || 0).getTime() >
    Date.now();
  const needsAuth = codeParam && (!token || !isTokenValid);
  const { data: didSetAuth } = useQuery([`didSetAuth`], () =>
    importGoogleDrive([]).catch(console.log)
  );
  const clerkToken = parseJwt(getTokenFromCookie() || ``);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      needsAuth &&
        (async () => {
          if (didSetAuth) return;
          try {
            const [accessToken, refreshToken] = await authGoogleDrive({
              code: codeParam,
              redirectUri: `${window.location.origin}/documents`,
            });

            localStorage.setItem(`accessToken`, accessToken);
            toast({ title: t(`successfullyAuthenticated`) });
            localStorage.setItem(`refreshToken`, refreshToken);
            localStorage.setItem(`expirationDate`, `${Date.now() + 3600000}`);
            router.replace(`/documents`);
          } catch (e) {
            console.error(`Failed to authenticate with Google Drive`, e);
            toast({ title: t(`failedToAuthenticate`) });
          }
        })();
    }
  }, [t]);

  const handleOpenPicker = () => {
    if (!process.env.NEXT_PUBLIC_CLIENT_ID || !process.env.NEXT_PUBLIC_API_KEY)
      return;
    if (!token || !isTokenValid) {
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
      token: authState?.access_token,
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
  };

  return (
    <Button variant="outline" type="button" onClick={() => handleOpenPicker()}>
      {!token || !isTokenValid
        ? t(`connectToGoogleDrive`)
        : t(`importFromDrive`)}
      <GoogleDriveLogo size={16} />
    </Button>
  );
};
