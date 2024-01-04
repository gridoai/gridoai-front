"use client";
import { Button } from "./ui/button";
import { GoogleDriveLogo } from "@phosphor-icons/react/dist/ssr";
import { useScopedI18n } from "@/locales/client";
import { useGdrivePicker } from "@/hooks/oauth/useGdrivePicker";

export const DriveSelect = () => {
  const t = useScopedI18n(`gdrive`);

  const {
    tokenValidityLoading,
    isAlreadyAuthenticated,
    handleOpenPicker,
    canAccessGdrive,
  } = useGdrivePicker();

  if (!canAccessGdrive) return null;

  return (
    <Button
      loading={tokenValidityLoading}
      variant="outline"
      type="button"
      onClick={() => handleOpenPicker()}
    >
      {!isAlreadyAuthenticated
        ? t(`connectToGoogleDrive`)
        : t(`importFromDrive`)}
      <GoogleDriveLogo size={16} />
    </Button>
  );
};
