import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Table from "../common/tables/Table";
import { getAllBooks } from "../data/BooksData";

const BooksTable = ({
  columns,
  pageIndex,
  pageSize,
  sorting,
  onPageChange,
  onPageSizeChange,
  setSorting,
}) => {
  const { category_id } = useParams();
  const queryClient = useQueryClient();
  const allBooksQueryKey = ["all books list"];
  const { data, ...allBooksQuery } = useQuery({
    queryKey: allBooksQueryKey,
    queryFn: getAllBooks,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
  });

  if (allBooksQuery.isLoading) {
    return (
      <div className="card text-info py-2 m-2" role="alert">
        Loading...
      </div>
    );
  }
  if (allBooksQuery.isError) {
    return (
      <div className="card text-danger py-2 m-2">
        Error occurred: {allBooksQuery.error.message}
      </div>
    );
  }
  if (allBooksQuery.isSuccess) {
    return (
      <>
        <div className="col-12 col-sm-12 py m-2">
          <div className="row"></div>
        </div>
        <div className="row">
          <Table
            pageIndex={pageIndex}
            pageSize={pageSize}
            columns={columns}
            data={
              category_id
                ? data.filter(
                    (book) => book.category.id === Number(category_id)
                  )
                : data
            }
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            sorting={sorting}
            setSorting={setSorting}
          />
        </div>
      </>
    );
  }
};

export default BooksTable;
