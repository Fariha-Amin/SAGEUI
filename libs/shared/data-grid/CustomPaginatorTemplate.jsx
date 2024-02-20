import React from "react";
import { classNames } from "primereact/utils";

const CustomPaginatorTemplate = ({ totalPages }) => {
  return {
    layout:
      "CurrentPageReport  PrevPageLink FirstPageLink PageLinks LastPageLink NextPageLink RowsPerPageDropdown",
    CurrentPageReport: (options) => {
      return (
        <span className={options.className}>
          Total: {options.totalRecords} Entries
        </span>
      );
    },
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {"Previous"}
        </button>
      );
    },
    FirstPageLink: (options) => {
      if (totalPages <= 0) return;
      return (
        <button
          type="button"
          className={
            options.disabled
              ? "p-paginator-first p-paginator-element p-link p-highlight"
              : options.className
          }
          onClick={options.onClick}
        >
          {"1"}
        </button>
      );
    },
    LastPageLink: (options) => {
      if (totalPages <= 1) return;
      return (
        <button
          type="button"
          className={
            options.disabled
              ? "p-paginator-last p-paginator-element p-link p-highlight"
              : options.className
          }
          onClick={options.onClick}
        >
          {totalPages}
        </button>
      );
    },
    PageLinks: (options) => {
      if (options.page + 1 === options.totalPages || options.page === 0) return;

      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <button className={className} style={{ userSelect: "none" }}>
            ...
          </button>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {"Next"}
        </button>
      );
    },
  };
};

export default CustomPaginatorTemplate;
