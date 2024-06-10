import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  alreadyBorrowedThisBook,
  borrowBook,
  cancelBorrow,
  getBorrow,
  getIfApprovedLoan,
} from "../data/BooksData";

const BorrowBook = ({ book }) => {
  const queryKey = ["borrowed_books", book.id];
  const getBorrowQueryKey = ["get-borrow", book.id];
  const getApprovedQueryKey = ["get-approved", book.id];
  const canBorrow = book.available > 1;
  const queryClient = useQueryClient();
  const getBorrowQuery = useQuery({
    queryKey: getBorrowQueryKey,
    queryFn: () => getBorrow(book.id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const { data: borrowApproved } = useQuery({
    queryKey: getApprovedQueryKey,
    queryFn: () => getIfApprovedLoan(book),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const checkBorrowedQuery = useQuery({
    queryKey,
    queryFn: () => alreadyBorrowedThisBook(book),
    onSuccess: ({ theBorrow: theNewBorrow }) =>
      queryClient.setQueryData(getBorrowQueryKey, (oldData) =>
        oldData ? { ...theNewBorrow } : oldData
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const borrowBookMutation = useMutation({
    mutationFn: () => borrowBook(book),
    onSuccess: (newBorrow) =>
      queryClient.setQueryData(getBorrowQueryKey, () => newBorrow),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: getApprovedQueryKey });
    },
  });
  const cancelBorrowMutation = useMutation({
    mutationFn: (theGottenBorrow) => cancelBorrow(theGottenBorrow),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });
  if (
    checkBorrowedQuery.isLoading ||
    borrowBookMutation.isLoading ||
    cancelBorrowMutation.isLoading
  ) {
    return <span className="text-info">Loading...</span>;
  }
  if (checkBorrowedQuery.isError) {
    console.log(
      `Error checking if book borrowed ${book.id}`,
      checkBorrowedQuery.error
    );
    return <span className="text-danger">error occurred</span>;
  }
  if (cancelBorrowMutation.isError) {
    return (
      <span className="card text-warning">Failed to cancel the borrow</span>
    );
  }
  if (cancelBorrowMutation.isSuccess) {
    <span className="card text-success">Borrow cancelled</span>;
  }
  if (checkBorrowedQuery.isSuccess) {
    return (
      <>
        {checkBorrowedQuery.data.borrowed && !borrowApproved && (
          <div className="card">
            <div className="card-body">
              <div className="card-text">
                <small className="text-info "> Awaiting approval.</small>
              </div>
              <button
                className="btn btn-sm btn-warning mt-2"
                onClick={() => cancelBorrowMutation.mutate(getBorrowQuery.data)}
              >
                <small>Cancel borrow</small>
              </button>
            </div>
          </div>
        )}
        {borrowApproved && (
          <span className="text-success" role="alert">
            <small>Staff approved your book borrow!</small>
          </span>
        )}
        {!checkBorrowedQuery.data.borrowed &&
          !borrowApproved &&
          (!canBorrow ? (
            <span className="text-warning">Unavailable</span>
          ) : (
            <button
              className="btn btn-sm btn-success"
              onClick={() => borrowBookMutation.mutate()}
            >
              <small>Borrow</small>
            </button>
          ))}
      </>
    );
  }
};

export default BorrowBook;
