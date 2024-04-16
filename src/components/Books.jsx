import React, { Component, useContext, useEffect, useState } from "react";
import Table from "../common/tables/Table";
import CommonListGroup from "../common/CommonListGroup";
import { createColumnHelper } from "@tanstack/react-table";
import books from "../fake_data/BooksData";
import {
  allBooks,
  bookAlreadyBorrowed,
  borrowBook,
  cancelBorrow,
  getAllBooks,
  getBorrow,
} from "../data/BooksData";
import { TablePagesContext } from "../PaginationContext";
import { AllBooksContext } from "../contexts/AllBooksContext";
import CategoryListGroup from "./CategoryListGroup";
import BooksTable from "./BooksTable";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ErrorPage from "../common/ErrorPage";
import { getUsername } from "../data/Auth";
import { loadingContext } from "../contexts/LoadingContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { set } from "lodash";
import BorrowBook from "./BorrowBook";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("id", {
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
        <div className="col-md">
          <div className="jumbotron">
            <h1 className="display-4">Hello, {getUsername() || "user"}!</h1>
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
