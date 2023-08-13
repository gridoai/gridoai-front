export interface Document {
  uid: string;
  name: number;
  title: string;
  content: string;
  source: DocumentSrc;
}
export type DocumentSrc =
  | { Upload: undefined }
  | { CreateButton: undefined }
  | { GDrive: { fileId: string } };
