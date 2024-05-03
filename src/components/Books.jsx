import { createColumnHelper } from "@tanstack/react-table";
import React, { useContext, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { TablePagesContext } from "../PaginationContext";
import ErrorPage from "../common/ErrorPage";
import { AllBooksContext } from "../contexts/AllBooksContext";
import { loadingContext } from "../contexts/LoadingContext";
import { getUsername } from "../data/Auth";
import { allBooks } from "../data/BooksData";
import BooksTable from "./BooksTable";
import BorrowBook from "./BorrowBook";
import CategoryListGroup from "./CategoryListGroup";

const currentLocation = "home/books";
const columnHelper = createColumnHelper();
const columns = [
  // columnHelper.accessor("id", {
  //   cell: (info) => info.getValue(),
  // }),

  columnHelper.accessor("image", {
    header: "",
    cell: (info) => {
      const book = info.cell.row.original;

      return (
        <div
          className="d-flex flex-grow-1 justify-content-center align-items-center"
          style={{ overflow: "hidden", width: 50, height: 100 }}
        >
          <Link to={`one_book/${book?.id}`} state={{ book }}>
            <img
              className="img-responsive py-1 mb-3"
              style={{ width: 50, height: "auto", display: "block" }}
              src={info.getValue()}
              alt="coverpage"
            />
          </Link>
        </div>
      );
    },
  }),
  columnHelper.accessor("name", {
    header: "Title",
    cell: (info) => {
      const book = info.cell.row.original;
      return (
        <Link to={`one_book/${book?.id}`} state={{ book }}>
          {info.getValue()}
        </Link>
      );
    },
  }),
  columnHelper.accessor("publisher", {
    header: (
      <span>
        Publisher
        <i className="fa-solid fa-briefcase px-2"></i>
      </span>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue().category_name,
  }),
  columnHelper.display({
    id: "borrow",
    header: "",
    cell: ({ row }) => {
      return <BorrowBook book={row.original} />;
    },
  }),
];

const Books = () => {
  const { allBooksTableData, allBooksSetTableData } =
    useContext(AllBooksContext);
  const {
    booksComp: { loading, setLoading },
  } = useContext(loadingContext);
  const {
    allBooksTable: {
      allBooksPageIndex,
      allBooksPageSize,
      allBooksSorting,
      allBooksSetPageIndex,
      allBooksSetPageSize,
      allBooksSetSorting,
    },
  } = useContext(TablePagesContext);

  useEffect(() => {
    loading && allBooks(allBooksSetTableData);
  }, [loading]);
  const tableArgs = {
    pageIndex: allBooksPageIndex,
    pageSize: allBooksPageSize,
    sorting: allBooksSorting,
    // data: allBooksTableData,
    columns,
    onPageChange: allBooksSetPageIndex,
    onPageSizeChange: allBooksSetPageSize,
    setSorting: allBooksSetSorting,
  };
  return (
    <div className="container-fluid text-center">
      <div className="row py-5">
        <div className="col-12 col-md-9">
          <div className="jumbotron">
            <h1 className="display-4">Hello👋, {getUsername() || "user"}!</h1>
            <p className="lead">This is a list of all available books.</p>
            <p></p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 ">
            <CategoryListGroup />
          </div>
          <div className="col-12 col-sm-12 col-md-9 col-lg-8 ">
            <Routes>
              <Route path="/">
                <Route index element={<BooksTable {...tableArgs} />} />
                <Route
                  path=":category_id"
                  element={<BooksTable {...{ ...tableArgs, pageIndex: 0 }} />}
                />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
