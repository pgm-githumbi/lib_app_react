// import logo from "./logo.svg";
import "./App.css";
import { createContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import PaginationContext from "./PaginationContext";

import Books from "./components/Books";
import Navbar from "./components/Navbar";
import MyBooks from "./components/MyBooks";
import ErrorPage from "./common/ErrorPage";
import TopLevelContext from "./contexts/TopLevelContext";
import "react-toastify/dist/ReactToastify.css";
import Approval from "./components/Approval";
import OneBook from "./components/OneBook";

function App() {
  const navig = useNavigate();
  const toBooks = () => {
    navig("/books");
    return <Books />;
  };
  return (
    <TopLevelContext>
      <PaginationContext>
        <Navbar />

        <div className="container container-fluid">
          <div className="row py-2">
            <div className="col-12 mx-auto px-auto">
              <Routes>
                <Route path="/*">
                  <Route path="books/*" element={<Books />} />
                  <Route path="borrowed_books/*" element={<MyBooks />} />
                  <Route path="staff/" element={<Approval />} />
                  <Route path="staff/one_book/:book_id" element={<OneBook />} />
                  <Route path="*" element={<ErrorPage />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </PaginationContext>
    </TopLevelContext>
  );
}

export default App;
