import {} from "@testing-library/user-event";

import * as React from "react";

import { FileWithKey, mockFileDownloadProps } from "../FileDownload.mock";
import { render, screen } from "@testing-library/react";

import { FileDownload } from "../FileDownload";
import { IFileDownloadProps } from "../FileDownload.types";
import userEvent from "@testing-library/user-event";

const scheduledFile = mockFileDownloadProps.items[0];
const availableFile = mockFileDownloadProps.items[1];
const user = userEvent.setup();

describe("FileDownload", () => {
  let defaultProps: IFileDownloadProps<FileWithKey>;

  beforeEach(() => {
    defaultProps = { ...mockFileDownloadProps };
  });

  it("should match default snapshot", () => {
    expect(
      render(<FileDownload {...defaultProps} />).container
    ).toMatchSnapshot();
  });

  it(`should not allow download for scheduled state`, () => {
    render(<FileDownload {...defaultProps} />);

    expect(
      screen.getByLabelText<HTMLInputElement>(
        `Select file ${scheduledFile.key}`
      )
    ).toBeDisabled();
  });

  it("should download selected files on download button click", async () => {
    const downloadClickFn = vi.fn();
    const props = {
      ...defaultProps,
      downloadActionProps: {
        ...defaultProps.downloadActionProps,
        onClick: downloadClickFn,
      },
    };

    render(<FileDownload {...props} />);

    // Download available file
    await user.click(screen.getByLabelText(`Select file ${availableFile.key}`));
    await user.click(screen.getByText("Download selected"));
    expect(downloadClickFn).toHaveBeenCalledWith([availableFile]);
  });

  describe("validate select all checkbox states", () => {
    it("select all", async () => {
      render(<FileDownload {...defaultProps} />);

      const selectAllCheckbox = screen.getByLabelText(
        "Select all files for download"
      );

      expect(screen.getByText("None selected")).toBeInTheDocument();
      await user.click(selectAllCheckbox);
      expect(screen.getByText("Selected: 2")).toBeInTheDocument();
    });

    it("select all - indeterminate state", async () => {
      render(<FileDownload {...defaultProps} />);

      const selectAllCheckbox = screen.getByLabelText(
        "Select all files for download"
      );

      await user.click(selectAllCheckbox);
      expect(screen.getByText("Selected: 2")).toBeInTheDocument();
    });

    it("select all - indeterminate", async () => {
      render(<FileDownload {...defaultProps} />);

      await user.click(
        screen.getByLabelText(`Select file ${availableFile.key}`)
      );

      const selectAllCheckbox = screen.getByLabelText<HTMLInputElement>(
        "Select all files for download"
      );

      expect(screen.getByText("Selected: 1")).toBeInTheDocument();
      expect(selectAllCheckbox.indeterminate).toBe(true);
    });
  });

  it.todo("should validate a11y fast pass checks", () => {
    // Test for accessibility errors using axe core library
  });
});
