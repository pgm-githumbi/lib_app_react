import { useLocation, useParams } from "react-router-dom";
import Table from "../common/tables/Table";

const OneBook = () => {
  const {
    state: {
      book: {
        name,
        description,
        image,
        isbn,
        pages,
        publisher,
        available,
        category_id,
        id,
      },
    },
  } = useLocation();
  const params = useParams();
  console.log("params", params);

  return (
    <div className="container container-fluid">
      <div className="col-12 py-2 m-2">
        <div className="row">
          <div className="details">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-book-open-reader px-2"></i>
              <div className="display-4">{name}</div>
            </div>
            <img
              className="img-responsive py-3 mb-3"
              src={image}
              alt="coverpage"
            />
            <p>
              <i className="fa-solid fa-comment px-2"></i>
              Description: {description}
            </p>
            <p>
              <i className="fa-solid fa-briefcase px-2"></i>
              Publisher: {publisher}
            </p>
            <p>
              <i className="fa-solid fa-fingerprint px-2"></i>
              Isbn: {isbn}
            </p>
            <p>
              <i className="fa-solid fa-table-columns px-2"></i>Pages: {pages}
            </p>
            <p>
              <i className="fa-solid fa-clock-rotate-left px-2"></i>
              Copies remaining: {available}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneBook;
