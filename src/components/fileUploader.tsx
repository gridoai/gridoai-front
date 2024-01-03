import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "@/services/api";
import { useLogger } from "@/services/logger";
import { Spinner, X } from "@phosphor-icons/react";
import { useToast } from "./use-toast";
import { Button } from "./ui/button";
import { asyncMap } from "../lib/utils";
import { canUpload } from "../services/rateLimit";
import Link from "next/link";
import { GradientBtn } from "./GradientBtn";
import { whatsappLink } from "../app/links";
import { useI18n } from "../locales/client";
import useUploadNotifications from "@/hooks/useUploadNotifications";

export const FileUploader = ({ onSuccess }: { onSuccess: () => void }) => {
  const [files, setFiles] = useState<Array<File> | undefined>();
  const logger = useLogger();
  const [loadingFile, setLoadingFile] = useState(false);
  const { toast } = useToast();
  const t = useI18n();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((otherFiles) => [...acceptedFiles, ...(otherFiles || [])]);
  }, []);
  const { status } = useUploadNotifications({
    onSuccess,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 60e6, // 1 MB = 1e6 bytes
    accept: {
      "text/plain": [`.txt`, `.md`],
      "application/pdf": [`.pdf`],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [`.docx`],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [`.pptx`],
    },
    onError: (e) => toast({ title: t(`upload.error`), description: e.message }),
  });

  const handleUploadClick = async () => {
    if (!(await canUpload())) {
      return toast({
        title: t(`planLimitErrorMessage.documents`),
        description: (
          <Link href={whatsappLink} target="_blank">
            <GradientBtn>{t(`planLimitErrorMessage.description`)}</GradientBtn>
          </Link>
        ),
      });
    }
    if (!files) {
      return;
    }
    setLoadingFile(true);
    logger.info(`uploading files`, files);
    asyncMap(files, (file) =>
      uploadFiles([file])
        .then(() => {
          toast({ title: `${t(`upload.started`)}: ${file.name}` });
          setFiles((oldFiles) => oldFiles?.filter((f) => f.name !== file.name));
        })
        .catch((err) => {
          logger.error(`Failed to upload file`, err);
          toast({
            title: `${t(`upload.error`)} ${file.name}: ${err.message}`,
            description: t(`tryLater`),
          });
        })
    ).finally(() => {
      setLoadingFile(false);
    });
  };

  return (
    <div className="flex items-center flex-wrap justify-between gap-2 pr-4">
      <div className="flex gap-2 flex-wrap">
        {files?.map((file) => {
          return (
            <Button
              variant="outline"
              className="rounded-full gap-1"
              size="sm"
              key={file.name}
            >
              {file.name}
              <X
                className="cursor-pointer"
                onClick={() => {
                  setFiles((otherFiles) =>
                    otherFiles?.filter((f) => f.name !== file.name)
                  );
                }}
              />
            </Button>
          );
        })}
      </div>
      <div
        {...getRootProps()}
        className={`w-full h-32 flex transition-all items-center justify-center mb-2 p-4 border-dashed border-2 ${
          isDragActive ? `bg-neutral-2` : `bg-background`
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-foreground text-center">{t(`upload.justDrop`)}</p>
        ) : (
          <p className="text-foreground text-center">{t(`upload.dragNDrop`)}</p>
        )}
      </div>

      {loadingFile ? (
        <Spinner className="animate-spin text-foreground" size={28} />
      ) : (
        <Button
          disabled={(files?.length || 0) < 1}
          variant={`outline`}
          onClick={handleUploadClick}
        >
          Upload
        </Button>
      )}
    </div>
  );
};
