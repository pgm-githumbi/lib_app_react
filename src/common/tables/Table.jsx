import React from "react";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import Thead from "./Thead";
import Tbody from "./Tbody";
import Pagination from "./Pagination";

const Table = ({
  data,
  columns,
  pageIndex,
  pageSize,
  sorting,
  setSorting,
  onPageChange,
  onPageSizeChange,
}) => {
  const table = useReactTable({
    columns,
    data,
    state: {
      pagination: {
        pageSize,
        pageIndex,
      },
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handlePageChange = (pageNo) => {
    table.setPageIndex(pageNo - 1);
    onPageChange(pageNo - 1);
  };

  const handlePageSizeChange = (pageSize) => {
    table.setPageSize(pageSize);
    onPageSizeChange(pageSize);
  };

  return (
    <React.Fragment>
      <table className="table table-striped table-bordered table-hover">
        <Thead table={table} />
        <Tbody table={table} />
      </table>
      <Pagination
        table={table}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      ;
    </React.Fragment>
  );
};

export default Table;
