"use client";
import React from "react";
import { FileUploader } from "../../../../components/fileUploader";
import { useI18n } from "../../../../locales/client";

export function UploadCard({ onSuccess }: { onSuccess?: () => void }) {
  const t = useI18n();
  return (
    <div className="p-2 m-1 flex-col gap-4 flex">
      <div className="text-3xl flex items-end gap-2 font-bold">
        Upload{` `}
        <div className="text-sm font-medium">
          {t(`upload.sizeLimit`, {
            maxSize: 60,
          })}
        </div>
      </div>
      <FileUploader onSuccess={() => onSuccess?.()} />
    </div>
  );
}
