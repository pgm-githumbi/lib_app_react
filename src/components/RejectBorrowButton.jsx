import { useMutation } from "react-query";
import { rejectBorrow } from "../data/BooksData";

const RejectBorrowButton = ({ borrow, bookQuery, userQuery }) => {
  const rejectMutation = useMutation(rejectBorrow);

  const anyLoading =
    rejectMutation.isLoading || bookQuery.isLoading || userQuery.isLoading;
  const anyError =
    rejectMutation.isError || bookQuery.isError || userQuery.isError;

  const loadingRender = (
    <span className="text-info">
      <small>Loading...</small>
    </span>
  );
  const rejectSuccessRender = (
    <span className="text-success">
      <small>Rejected successfully!</small>
    </span>
  );
  const rejectErrorRender = (
    <span className="text-danger">
      Failed to reject. ${rejectMutation.error?.message};
    </span>
  );

  const normalRender = (
    <button
      className="btn btn-sm btn-danger"
      disabled={anyLoading || anyError}
      onClick={() => rejectMutation.mutate(borrow)}
    >
      <i className="fa-solid fa-ban px-1"></i>Reject
    </button>
  );
  return (
    <>
      {!rejectMutation.isError &&
        !rejectMutation.isLoading &&
        !rejectMutation.isSuccess &&
        normalRender}
      {rejectMutation.isError && rejectErrorRender}
      {rejectMutation.isSuccess && rejectSuccessRender}
      {rejectMutation.isLoading && loadingRender}
    </>
  );
};

export default RejectBorrowButton;
