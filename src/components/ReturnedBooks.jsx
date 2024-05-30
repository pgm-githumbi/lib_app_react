import { createColumnHelper } from "@tanstack/react-table";
import Table from "../common/tables/Table";
import { useContext, useEffect } from "react";
import { TablePagesContext } from "../PaginationContext";
import { returnedLoanedBooks } from "../data/BooksData";
import { ReturnedBooksContext } from "../contexts/ReturnedBooksContext";
import { loadingContext } from "../contexts/LoadingContext";

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
  columnHelper.accessor("pages", {
    header: "pages",
    cell: (info) => info.getValue(),
  }),
];
const ReturnedBooks = () => {
  const { returnedBooks, setReturnedBooks } = useContext(ReturnedBooksContext);
  // const [loading, setLoading] = useState(true);
  const {
    returnedBooksComp: { loading, setLoading },
  } = useContext(loadingContext);
  const {
    returnedBooksTable: {
      returnedBooksPageIndex,
      returnedBooksPageSize,
      returnedBooksSorting,
      returnedBooksSetPageIndex,
      returnedBooksSetPageSize,
      returnedBooksSetSorting,
    },
  } = useContext(TablePagesContext);
  useEffect(() => {
    async function fetchData() {
      const books = await returnedLoanedBooks();
      console.log("books", books);
      setReturnedBooks(books);
      setLoading(false);
    }
    loading && fetchData();
  }, [loading, setLoading, setReturnedBooks]);
  const anyBooks = () => Object.keys(returnedBooks).length;
  const errMessage = () => (loading && "Loading...") || "No books found.";
  return (
    <>
      {(anyBooks() && (
        <Table
          data={returnedBooks}
          columns={columns}
          pageIndex={returnedBooksPageIndex}
          pageSize={returnedBooksPageSize}
          sorting={returnedBooksSorting}
          onPageChange={returnedBooksSetPageIndex}
          onPageSizeChange={returnedBooksSetPageSize}
          setSorting={returnedBooksSetSorting}
        />
      )) || (
        <div className="card alert alert-info">
          <div className="card-body">
            <span className="text-body-secondary">{errMessage()}</span>
            <div className="row py-3">
              <button
                className={
                  "btn btn-sm btn-primary " + (loading && "disabled") || ""
                }
                onClick={() => setLoading(true)}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReturnedBooks;
