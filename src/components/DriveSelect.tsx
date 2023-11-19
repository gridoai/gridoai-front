"use client";
import { authGoogleDrive, importGoogleDrive } from "@/services/api";
import { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { Button } from "./ui/button";
import { GoogleDriveLogo } from "@phosphor-icons/react";
import { useToast } from "./use-toast";

export const DriveSelect = () => {
  const [openPicker, authResponse] = useDrivePicker();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(`googleDriveToken`, JSON.stringify(authResponse));
  }, [authResponse]);

  const handleOpenPicker = () => {
    setLoading(true);
    openPicker({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      developerKey: process.env.NEXT_PUBLIC_API_KEY,
      token: authResponse?.access_token,
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      setSelectFolderEnabled: true,
      multiselect: true,
      setIncludeFolders: true,

      // customViews: customViewsArray, // custom view
      callbackFunction: async (data) => {
        console.log(`data`, data, authResponse);
        if (data.action !== `picked` || !authResponse) {
          console.log(`User clicked cancel/close button`, data.action);
          setLoading(false);
          return;
        }
        try {
          await authGoogleDrive({
            code: authResponse.access_token,
            redirectUri:
              process.env.NEXT_PUBLIC_REDIRECT_URI || window.location.href,
          });
          const ids = data.docs?.map((doc) => doc.id);
          await importGoogleDrive(ids);
          toast({ title: `Importing files from Google Drive, please wait` });
        } catch (e) {
          console.error(`Failed to import from Google Drive`, e);
          toast({ title: `Failed to import from Google Drive` });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Button
      loading={loading}
      variant="outline"
      type="button"
      onClick={() => handleOpenPicker()}
    >
      Import from Drive
      <GoogleDriveLogo size={16} />
    </Button>
  );
};
