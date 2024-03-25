const ApproveBorrowButton = ({ approveMutation, borrow, book, user }) => {
  const { isLoading, isError, isSuccess, error, mutate } = approveMutation;
  const loadingRender = <span>Loading...</span>;
  const successRender = <span>Approved!</span>;
  const errorRender = <span>Failed to approve. {error.message}</span>;
  const normalRender = <span>approve</span>;

  const btnClass = (isLoading && "info") || (isError && "danger") || "success";
  return (
    <button
      className={`"btn btn-${btnClass}`}
      disabled={isLoading || isSuccess}
      onClick={() => mutate(borrow)}
    >
      <i className="fa-solid fa-check px-1"></i>
      {isLoading && loadingRender}
      {isSuccess && successRender}
      {isError && errorRender}
      {!isError && !isLoading && !isSuccess && normalRender}
    </button>
  );
};

export default ApproveBorrowButton;
