import * as React from "react";

import { IFileDownloadItem, IFileDownloadProps } from "./FileDownload.types";

export interface FraudInvestigationFile {
  id: string;
  name: string;
  device: string;
  path: string;
  status: "Scheduled" | "Available";
}

const files: FraudInvestigationFile[] = [
  {
    id: "3564d56c-dee1-47e3-a1d3-65252096c1bf",
    name: "smss.exe",
    device: "Mario",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "Scheduled",
  },

  {
    id: "bd817d8e-f1ce-4ccc-ba5a-cef2774e1179",
    name: "netsh.exe",
    device: "Luigi",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "Available",
  },

  {
    id: "47e139d8-48bb-4461-8fec-c8a7886cf386",
    name: "uxtheme.dll",
    device: "Peach",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "Available",
  },

  {
    id: "829d8a70-6df8-4419-a4e9-ccc02b1a2fde",
    name: "aries.sys",
    device: "Daisy",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
    status: "Scheduled",
  },

  {
    id: "969f5965-3118-43c0-9d6a-d450e582cf82",
    name: "cryptbase.dll",
    device: "Yoshi",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "Scheduled",
  },

  {
    id: "5",
    name: "7za.exe",
    device: "Toad",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "Scheduled",
  },
];

export type FileWithKey = FraudInvestigationFile & IFileDownloadItem;
const mockItems: FileWithKey[] = files.map((file) => ({
  ...file,
  key: file.id,
}));

export const mockFileDownloadProps: IFileDownloadProps<FileWithKey> = {
  items: mockItems,
  caption: "Download files for fraud analysis",
  downloadActionProps: {
    buttonText: "Download selected",

    // Parent/Consumer component handles the responsibility of how to download files.
    onClick: (items: FileWithKey[]) =>
      alert(items.map((i) => `${i.device} => ${i.path} \n`).join("\n")),
  },
  columns: [
    { header: "Name", key: "name" },
    { header: "Device", key: "device" },
    { header: "Path", key: "path" },
    {
      header: "Status",
      key: "status",
      customRenderFunction: ({ status }: FileWithKey) => (
        <div className="flex-row-centered">
          {status === "Available" && (
            <span role="presentation" className="status-green" />
          )}

          <span>{status}</span>
        </div>
      ),
    },
  ],
  canDownloadFile: ({ status }: FileWithKey) => status === "Available",
  selectionMode: "multiple",
};
