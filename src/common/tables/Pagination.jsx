import _ from "lodash";
import { PrevPageItem } from "./PrevPageItem";
import { NextPageItem } from "./NextPageItem";
import { PageItem } from "./PageItem";

const Pagination = ({ table, onPageChange, onPageSizeChange }) => {
  const goToPage = (pageNo) => {
    console.log("Going to pageNo: ", pageNo);
    onPageChange(pageNo);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <section className="col">
          <nav>
            <ul className="pagination">
              <PrevPageItem table={table} goToPage={goToPage} />
              {_.range(1, table.getPageCount() + 1).map((pageNo) => (
                <PageItem
                  key={pageNo}
                  table={table}
                  pageNo={pageNo}
                  goToPage={goToPage}
                />
              ))}
              <NextPageItem table={table} goToPage={goToPage} />
            </ul>
          </nav>
        </section>
        <div className="col col-lg-auto offset-md-auto">
          <span>Per page</span>
        </div>
        <span className="col col-lg-auto me-auto offset-auto">
          <select
            className="form-select "
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
            }}
          >
            {[2, 4, 6, 8].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
};

export default Pagination;
