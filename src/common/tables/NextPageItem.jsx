import { Link } from "react-router-dom";

export const NextPageItem = ({ table, goToPage }) => {
  const nextDisabled = table.getCanNextPage() ? "" : "disabled";
  const currPage = table.getState().pagination.pageIndex;
  return (
    <li className={`page-item ${nextDisabled}`}>
      <Link className="page-link" onClick={() => goToPage(currPage + 2)}>
        Next
      </Link>
    </li>
  );
};
