import useApproveBorrowMutation from "../hooks/useApproveBorrowMutation";

const ApproveBorrowButton = ({ borrow, bookQuery, userQuery }) => {
  const approveMutation = useApproveBorrowMutation();
  const anyLoading =
    approveMutation.isLoading || bookQuery.isLoading || userQuery.isLoading;
  const anyError =
    approveMutation.isError || bookQuery.isError || userQuery.isError;

  const loadingRender = <span className="text-info">Loading...</span>;
  const approveSuccessRender = <span className="text-success">Approved!</span>;
  const approveErrorRender = (
    <span className="text-danger">
      Failed to approve. ${approveMutation.error?.message};
    </span>
  );

  const normalRender = (
    <button
      className={`btn btn-sm btn-success`}
      disabled={anyLoading || anyError}
      onClick={() => approveMutation.mutate(borrow)}
    >
      <i className="fa-solid fa-check px-1"></i>
      approve
    </button>
  );
  return (
    <>
      {!approveMutation.isError &&
        !approveMutation.isLoading &&
        !approveMutation.isSuccess &&
        normalRender}
      {approveMutation.isError && approveErrorRender}
      {approveMutation.isSuccess && approveSuccessRender}
      {approveMutation.isLoading && loadingRender}
    </>
  );
};

export default ApproveBorrowButton;
