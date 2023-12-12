"use client";
import { Button } from "./ui/button";
import { GoogleDriveLogo } from "@phosphor-icons/react";
import { useScopedI18n } from "@/locales/client";
import { useGdrivePicker } from "@/hooks/oauth/useGdrivePicker";

export const DriveSelect = () => {
  const t = useScopedI18n(`gdrive`);

  const { tokenValidityLoading, isAlreadyAuthenticated, handleOpenPicker } =
    useGdrivePicker();

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
