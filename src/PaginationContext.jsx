import { createContext, useState } from "react";

export const TablePagesContext = createContext({
  loanBooksTable: {
    pageIndex: 0,
    setPageIndex: () => {},
    pageSize: 8,
    setPageSize: () => {},
    sorting: [],
    setSorting: () => {},
  },
  allBooksTable: {
    pageIndex: 0,
    setPageIndex: () => {},
    pageSize: 2,
    setPageSize: () => {},
    sorting: [],
    setSorting: () => {},
  },
  returnedBooksTable: {
    pageIndex: 0,
    setPageIndex: () => {},
    pageSize: 6,
    setPageSize: () => {},
    sorting: [],
    setSorting: () => {},
  },
  approvalTable: {
    // approvalTablePageIndex: 0,
    // approvalTableSetPageIndex: () => {},
    // approvalTablePageSize: 6,
    // approvalTableSetPageSize: () => {},
    // approvalTableSorting: [],
    // approvalTableSetSorting: () => {},
  },
});
const PaginationContext = ({ children }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sorting, setSorting] = useState([]);

  const [allBooksPageIndex, allBooksSetPageIndex] = useState(0);
  const [allBooksPageSize, allBooksSetPageSize] = useState(20);
  const [allBooksSorting, allBooksSetSorting] = useState([]);

  const [returnedBooksPageIndex, returnedBooksSetPageIndex] = useState(0);
  const [returnedBooksPageSize, returnedBooksSetPageSize] = useState(20);
  const [returnedBooksSorting, returnedBooksSetSorting] = useState([]);

  const [approvalTablePageIndex, approvalTableSetPageIndex] = useState(0);
  const [approvalTablePageSize, approvalTableSetPageSize] = useState(20);
  const [approvalTableSorting, approvalTableSetSorting] = useState([]);

  return (
    <TablePagesContext.Provider
      className="Provider"
      value={{
        loanBooksTable: {
          sorting,
          pageIndex,
          pageSize,
          setPageIndex,
          setPageSize,
          setSorting,
        },
        allBooksTable: {
          allBooksPageIndex,
          allBooksPageSize,
          allBooksSorting,
          allBooksSetPageIndex,
          allBooksSetPageSize,
          allBooksSetSorting,
        },
        returnedBooksTable: {
          returnedBooksPageIndex,
          returnedBooksPageSize,
          returnedBooksSorting,
          returnedBooksSetPageIndex,
          returnedBooksSetPageSize,
          returnedBooksSetSorting,
        },
        approvalTable: {
          approvalTablePageIndex,
          approvalTablePageSize,
          approvalTableSorting,
          approvalTableSetPageIndex,
          approvalTableSetPageSize,
          approvalTableSetSorting,
        },
      }}
    >
      {children}
    </TablePagesContext.Provider>
  );
};

export default PaginationContext;
