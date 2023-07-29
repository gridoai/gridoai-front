import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "@/services/api";
import { logger } from "@/services/logger";
import { Spinner, X } from "@phosphor-icons/react";
import { useToast } from "./use-toast";
import { Button } from "./ui/button";

export const FileUploader = ({ onSuccess }: { onSuccess: () => void }) => {
  const [files, setFiles] = useState<Array<File> | undefined>();
  const [loadingFile, setLoadingFile] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFiles((otherFiles) => [...acceptedFiles, ...(otherFiles || [])]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 30e6, // 1 MB = 1e6 bytes
    maxFiles: 50,
    accept: {
      "text/plain": [".txt", ".md"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
    },
    onError: (e) =>
      toast({ title: "Can't upload files", description: e.message }),
  });

  const handleUploadClick = () => {
    if (!files) {
      return;
    }
    setLoadingFile(true);
    logger.info("uploading files", files);
    uploadFiles(files)
      .then((data) => logger.info("files uploaded: ", files))
      .then(() => {
        toast({ title: "Files uploaded successfully" });
        setFiles(undefined);
        onSuccess();
      })
      .catch((err) => {
        logger.error("failed to upload files", err);
        toast({
          title: `Error uploading files: ${err.message}`,
          description: "Please try again later",
        });
      })
      .finally(() => {
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
          isDragActive ? "bg-neutral-2" : "bg-background"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-foreground text-center">
            Drop the files here ...{" "}
          </p>
        ) : (
          <p className="text-foreground text-center">
            {"Drag 'n' drop some files here, or click to select files"}
          </p>
        )}
      </div>
      {loadingFile ? (
        <Spinner className="animate-spin text-foreground" size={28} />
      ) : (
        <Button
          disabled={(files?.length || 0) < 1}
          variant={"outline"}
          onClick={handleUploadClick}
        >
          Upload
        </Button>
      )}
    </div>
  );
};
