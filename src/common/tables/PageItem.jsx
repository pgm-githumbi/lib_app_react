import { Link } from "react-router-dom";

export const PageItem = ({ table, pageNo, goToPage }) => {
  const currPage = table.getState().pagination.pageIndex + 1;
  const disabled = pageNo === currPage ? "disabled" : "";
  return (
    <li className={`page-item ${disabled}`}>
      <Link className="page-link" onClick={() => goToPage(pageNo)}>
        {pageNo}
      </Link>
    </li>
  );
};
