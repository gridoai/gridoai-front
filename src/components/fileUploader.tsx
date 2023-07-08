import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "@/services/api";
import { logger } from "@/services/logger";
import { Spinner } from "@phosphor-icons/react";
import { useToast } from "./use-toast";
import { Button } from "./ui/button";

export const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<Array<File> | undefined>();
  const [loadingFile, setLoadingFile] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
      <div
        {...getRootProps()}
        className={`w-full h-32 flex items-center justify-center mb-2 p-4 border-dashed border-2 ${
          isDragActive ? "bg-neutral-2" : "bg-neutral-0"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-white text-center">Drop the files here ...</p>
        ) : (
          <p className="text-white text-center">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      {loadingFile ? (
        <Spinner className="animate-spin text-white" size={28} />
      ) : (
        <Button variant={"outline"} onClick={handleUploadClick}>
          Upload
        </Button>
      )}
    </div>
  );
};
