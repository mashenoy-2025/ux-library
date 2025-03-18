import "./FileDownload.less";

import * as React from "react";

import {
  IAction,
  IFileDownloadItem,
  IFileDownloadProps,
} from "./FileDownload.types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { classNames } from "../shared/utils";

export const FileDownload = <T extends IFileDownloadItem>({
  columns,
  items,
  downloadActionProps,
  caption,
  canDownloadFile,
}: IFileDownloadProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  const { buttonText, onClick } = downloadActionProps;

  const isItemSelected = useCallback(
    (item: T) => selectedItems.some((s) => s.id === item.id),
    [selectedItems]
  );

  const filesAvailableForDownload = useMemo(
    () => items.filter(canDownloadFile),
    [canDownloadFile, items]
  );

  const isAllItemsSelected =
    selectedItems.length === filesAvailableForDownload.length;

  useEffect(() => {
    if (!selectAllCheckboxRef.current) return;

    selectAllCheckboxRef.current.indeterminate =
      selectedItems.length > 0 &&
      selectedItems.length < filesAvailableForDownload.length;
  }, [selectedItems]);

  const onItemSelectionToggle = useCallback(
    (item: T) => () => {
      if (!canDownloadFile(item)) {
        return;
      }

      const isItemAlreadySelected = selectedItems.some(
        ({ id }) => id === item.id
      );

      if (isItemAlreadySelected) {
        setSelectedItems([...selectedItems.filter(({ id }) => id !== item.id)]);
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    },
    [selectedItems, setSelectedItems]
  );

  const onSelectAllToggle = useCallback(() => {
    if (isAllItemsSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...filesAvailableForDownload]);
    }
  }, [setSelectedItems, filesAvailableForDownload, isAllItemsSelected]);

  const onDownloadClick = useCallback(
    (onClick: IAction<T>["onClick"]) => () => {
      onClick(selectedItems);
    },
    [selectedItems]
  );

  const toolbarJsx = (
    <div className="FileDownload__toolbar">
      <span className="selection_information" aria-live="polite">
        {selectedItems.length
          ? `Selected: ${selectedItems.length}`
          : "None selected"}
      </span>

      <button
        type="button"
        onClick={onDownloadClick(onClick)}
        disabled={!selectedItems.length}
      >
        {buttonText}
      </button>
    </div>
  );

  return (
    <div className="FileDownload">
      {toolbarJsx}

      <table className="FileDownload__table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            <th key="header_selectAll">
              <input
                id="checkbox_selectAll"
                type="checkbox"
                onChange={onSelectAllToggle}
                checked={isAllItemsSelected}
                ref={selectAllCheckboxRef}
                aria-label="Select all files for download"
              />
            </th>

            {columns.map(({ key, header }) => (
              <th key={`header_${key}`} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={classNames(
                isItemSelected(item) && "selected",
                !canDownloadFile(item) && "disabled"
              )}
              onClick={onItemSelectionToggle(item)}
            >
              <td key="selection">
                <input
                  id={`checkbox_select_${item.id}`}
                  type="checkbox"
                  checked={isItemSelected(item)}
                  disabled={!canDownloadFile(item)}
                  aria-label={`Select file ${item.name}`}
                  onChange={onItemSelectionToggle(item)}
                />
              </td>

              {columns.map(({ key, customRenderFunction }) => (
                <td key={key}>
                  {customRenderFunction
                    ? customRenderFunction(item)
                    : item[key]}
                </td>
              ))}
            </tr>
          ))}

          {/* todo: Handle no items scenario */}
        </tbody>
      </table>
    </div>
  );
};
