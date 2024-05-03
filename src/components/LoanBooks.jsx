import {
  // Table,
  createColumnHelper,
} from "@tanstack/react-table";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { TablePagesContext } from "../PaginationContext";
import CustomTable from "../common/tables/Table";
import { getLoanedBooks } from "../data/BooksData";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("id", {
    header: "id",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("publisher", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    cell: (info) => info.getValue(),
  }),
  // columnHelper.accessor("available", {
  //   cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor("pages", {
    header: "no of pages",
    cell: (info) => info.getValue(),
  }),
];

const LoanBooks = () => {
  const { isLoading, ...loanedBooksQuery } = useQuery({
    queryKey: ["get-loaned-books"],
    queryFn: getLoanedBooks,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    loanBooksTable: {
      pageIndex,
      pageSize,
      sorting,
      setPageIndex,
      setPageSize,
      setSorting,
    },
  } = useContext(TablePagesContext);

  const errMessage = () => {
    return (
      (loanedBooksQuery.isError &&
        `An error occurred: ${loanedBooksQuery.error.message}`) ||
      (isLoading && "Waiting for loaned books...") ||
      "No loaned books yet. Borrow one first."
    );
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col col-auto">
            {(loanedBooksQuery.data && (
              <CustomTable
                data={loanedBooksQuery.data}
                columns={columns}
                sorting={sorting}
                setSorting={setSorting}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChange={setPageIndex}
                onPageSizeChange={setPageSize}
              />
            )) || (
              <div className="card alert alert-info">
                <div className="card-body">
                  <span className="text-body-secondary">{errMessage()}</span>
                  <div className="row py-3">
                    <button
                      className={
                        "btn btn-sm btn-primary " + (isLoading && "disabled") ||
                        ""
                      }
                      onClick={() => loanedBooksQuery.refetch()}
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoanBooks;
