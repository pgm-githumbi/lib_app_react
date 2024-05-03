import { createColumnHelper } from "@tanstack/react-table";
import { useContext } from "react";
import { useQueries, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { TablePagesContext } from "../PaginationContext";
import Table from "../common/tables/Table";
import { getABook, getAUser, getBorrows } from "../data/BooksData";
import { STAFF, useCurrUserIs } from "../hooks/user";
import ApproveBorrowButton from "./ApproveBorrowButton";
import RejectBorrowButton from "./RejectBorrowButton";

const currentLocation = "/home/staff";
const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("book", {
    header: "Book",
    cell: ({ getValue, ...info }) => {
      const { isSuccess, data: book, isError, error, isLoading } = getValue();
      const errorRender = <span>Error occurred. {error?.message}</span>;
      const bookRender = (
        <Link
          to={`${currentLocation}/one_book/${book?.id}`}
          state={{ book: { id: 4, ...book } }}
        >
          {book?.name}
        </Link>
      );
      return (
        <>
          {isLoading && <span>Loading...</span>}
          {isError && errorRender}
          {isSuccess && bookRender}
        </>
      );
    },
  }),
  columnHelper.accessor("user", {
    header: "User",
    cell: (info) => {
      const { isSuccess, data, isError, error, isLoading } = info.getValue();

      return (
        <span>
          <i className="fa-regular fa-user px-1"></i>
          {isSuccess && data?.name}
          {isError && error?.message}
          {isLoading && "Loading..."}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "approve",
    header: "",
    cell: (info) => {
      const { borrow, book, user } = info.row.original;
      return (
        <ApproveBorrowButton
          borrow={borrow}
          userQuery={user}
          bookQuery={book}
        />
      );
    },
  }),
  columnHelper.display({
    id: "reject",
    header: "",
    cell: (info) => {
      const { borrow, book, user } = info.row.original;
      return (
        <RejectBorrowButton bookQuery={book} userQuery={user} borrow={borrow} />
      );
    },
  }),
];

const Approval = () => {
  const {
    approvalTable: {
      approvalTablePageIndex: pageIndex,
      approvalTablePageSize: pageSize,
      approvalTableSorting,
      approvalTableSetPageIndex,
      approvalTableSetPageSize,
      approvalTableSetSorting,
    },
  } = useContext(TablePagesContext);

  const { isSuccess: gotRole, data: isStaff } = useCurrUserIs(STAFF);
  const borrowQuery = useQuery({
    queryKey: ["staff all book borrow", pageIndex, pageSize],
    queryFn: () => getBorrows({ page: pageIndex, pageSize }),
    keepPreviousData: true,
    onSuccess: (borrws) => console.log("Borrows", borrws),
    refetchOnMount: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const bookIds =
    borrowQuery.isSuccess && borrowQuery.data.map((row) => row.book_id);
  const userIds =
    borrowQuery.isSuccess && borrowQuery.data.map((row) => row.user_id);

  const getBooksQueries = useQueries(
    (bookIds || []).map((book_id) => ({
      queryKey: ["get book", book_id],
      queryFn: () => getABook(book_id),
      enabled: borrowQuery.isSuccess,
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: (book) => console.log(`Book ${book_id} found`, book),
    }))
  );

  const getUsersQueries = useQueries(
    (userIds || []).map((user_id) => ({
      queryKey: ["get user", user_id],
      queryFn: () => getAUser(user_id),
      enabled: borrowQuery.isSuccess,
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: (user) => console.log(`User ${user_id} found`, user),
    }))
  );

  const completeSuccess =
    borrowQuery.isSuccess &&
    getBooksQueries &&
    Array.isArray(getBooksQueries) &&
    getBooksQueries.length === borrowQuery.data.length &&
    getBooksQueries.every((query) => query.isSuccess) &&
    getUsersQueries &&
    Array.isArray(getUsersQueries) &&
    getUsersQueries.length === borrowQuery.data.length &&
    getUsersQueries.every((query) => query.isSuccess);

  const anyLoading =
    borrowQuery.isLoading ||
    !Array.isArray(getBooksQueries) ||
    !Array.isArray(getUsersQueries) ||
    getBooksQueries.some((query) => query.isLoading) ||
    getUsersQueries.some((query) => query.isLoading);

  const completeData =
    borrowQuery.isSuccess &&
    borrowQuery.data.map(({ user_id, book_id, id }, index) => ({
      book_id,
      book: getBooksQueries[index],
      user_id,
      user: getUsersQueries[index],
      id,
      borrow: borrowQuery.data[index],
    }));

  const querySuccessButNoData =
    completeSuccess && completeData && Object.keys(completeData).length === 0;

  const loadingRender = (
    <div className="card text-info py-2" role="alert">
      <div className="card-body">Loading...</div>
    </div>
  );
  const successRender = (
    <>
      <div className="row">
        <Table
          data={completeData}
          columns={columns}
          pageIndex={pageIndex}
          pageSize={pageSize}
          sorting={approvalTableSorting}
          onPageChange={approvalTableSetPageIndex}
          onPageSizeChange={approvalTableSetPageSize}
          setSorting={approvalTableSetSorting}
        />
      </div>
    </>
  );

  const notStaffMember = (
    <div className="card">
      <div
        className="display-5 alert alert-danger alert-dismissible text-info"
        role="alert"
      >
        <div className="card-body">
          You're not a staff member.
          <p>
            <small>
              Hint: login as MainStaffExample@example.com with password:
              password
            </small>
          </p>
        </div>
      </div>
    </div>
  );

  const successRenderNoData = (
    <div className="card">
      <div
        className="display-5 alert alert-danger alert-dismissible text-info"
        role="alert"
      >
        <div className="card-body">
          You're either not a staff member or you are and no student has
          attempted to borrow a book for you to approve yet.
        </div>
      </div>
    </div>
  );
  const errorRender = (
    <div className="card">
      <div
        className="alert alert-danger alert-dismissable text-danger"
        role="alert"
      >
        <div className="card-body">
          Error occurred.{borrowQuery.error?.message}
        </div>
      </div>
    </div>
  );
  return (
    <div className="container container-fluid">
      <div className="row">
        <div className="col-12 py-2 mx-auto-2">
          {gotRole && !isStaff && notStaffMember}
          {borrowQuery.isLoading && loadingRender}
          {borrowQuery.isError && errorRender}
          {borrowQuery.isSuccess && !querySuccessButNoData && successRender}
          {borrowQuery.isSuccess &&
            querySuccessButNoData &&
            successRenderNoData}
        </div>
      </div>
    </div>
  );
};

export default Approval;
