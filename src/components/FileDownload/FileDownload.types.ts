export interface IFileDownloadItem {
  id: string;
  name: string;
}

export interface IFileDownloadColumnType<T> {
  key: string;
  header: string;
  customRenderFunction?: (item: T) => React.ReactNode;
}

export type IFileDownloadSelectionMode = "single" | "multiple";

export interface IAction<T> {
  buttonText: string;
  onClick: (items: T[]) => void;
}

export interface IFileDownloadProps<T extends IFileDownloadItem> {
  items: T[];
  columns: IFileDownloadColumnType<T>[];
  // If we want to support multiple actions, switch to IAction<T>[] array.
  downloadActionProps: IAction<T>; //
  caption?: string;
  className?: string;

  // todo: Support selectionMode to allow single or multiple file downloads
  selectionMode: IFileDownloadSelectionMode;
  canDownloadFile: (item: T) => boolean;
}
