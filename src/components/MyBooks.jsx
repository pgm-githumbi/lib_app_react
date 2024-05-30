import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoanBooks from "./LoanBooks";
import ReturnedBooks from "./ReturnedBooks";
import ErrorPage from "../common/ErrorPage";
import CommonListGroup from "../common/CommonListGroup";
import { getUsername } from "../data/Auth";

const parentPath = "/home/borrowed_books";
const sidebarArgs = [
  {
    visibleName: "Loaned Books",
    link: "loan_books",
    parentPath: parentPath,
    activeOn: ["", "loan_books"],
  },
  {
    visibleName: "Returned Books",
    link: "returned_books",
    parentPath: parentPath,
    activeOn: ["returned_books"],
  },
];
const MyBooks = () => {
  const [username] = useState(getUsername() || "user");
  return (
    <div className="container-sm text-center">
      <div className="row py-3">
        <div className="col-12 col-sm-12 col-md-8 jumbotron py-2">
          <h1 className="display-4">Hello👋, {username}!</h1>
          <p className="lead">
            This is a list of books you're currently reading.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 col-lg-3">
          <CommonListGroup args={sidebarArgs} />
        </div>
        <div className="col-12 col-md-7 col-lg-6 px-2 py-2">
          <Routes>
            <Route path="/">
              <Route index element={<LoanBooks />} />
              <Route path="loan_books/*" element={<LoanBooks />} />
              <Route path="returned_books" element={<ReturnedBooks />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
