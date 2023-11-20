"use client";
import { authGoogleDrive, importGoogleDrive } from "@/services/api";
import { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { Button } from "./ui/button";
import { GoogleDriveLogo } from "@phosphor-icons/react";
import { useToast } from "./use-toast";
import { useRouter, useSearchParams } from "next/navigation";

export const DriveSelect = () => {
  const [openPicker] = useDrivePicker();
  const params = useSearchParams();
  const codeParam = params?.get(`code`);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    codeParam &&
      (async () => {
        try {
          const [accessToken, refreshToken] = await authGoogleDrive({
            code: codeParam,
            redirectUri: `${window.location.origin}/documents`,
          });

          toast({ title: `Successfully authenticated with Google Drive` });
          localStorage.setItem(`refreshToken`, refreshToken);
          localStorage.setItem(`accessToken`, accessToken);
          router.replace(`/documents`);
        } catch (e) {
          console.error(`Failed to authenticate with Google Drive`, e);
          toast({ title: `Failed to authenticate with Google Drive` });
        }
      })();
  }, [codeParam, router, toast]);

  const handleOpenPicker = () => {
    if (!process.env.NEXT_PUBLIC_CLIENT_ID || !process.env.NEXT_PUBLIC_API_KEY)
      return;
    const token = localStorage.getItem(`accessToken`);
    if (!token) {
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
          toast({ title: `Importing files from Google Drive, please wait` });
          await importGoogleDrive(ids);
          toast({ title: `Successfully imported from Google Drive` });
        } catch (e) {
          console.error(`Failed to import from Google Drive`, e);
          toast({ title: `Failed to import from Google Drive` });
        }
      },
    });
  };

  return (
    <Button variant="outline" type="button" onClick={() => handleOpenPicker()}>
      Import from Drive
      <GoogleDriveLogo size={16} />
    </Button>
  );
};
