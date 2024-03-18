import { Link } from "react-router-dom";

export const PrevPageItem = ({ table, goToPage }) => {
  const nextDisabled = table.getCanPreviousPage() ? "" : "disabled";
  const currPage = table.getState().pagination.pageIndex;

  return (
    <li className={`page-item ${nextDisabled}`}>
      <Link
        className="page-link"
        onClick={() => {
          // table.previousPage();
          goToPage(currPage - 1);
        }}
      >
        Prev
      </Link>
    </li>
  );
};
