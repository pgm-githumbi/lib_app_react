import { all } from "axios";
import { createContext, useState } from "react";

export const AllBooksContext = createContext({
  allBooksTableData: [],
  allBooksSetTableData: () => {},
});

const AllBooksContextComponent = ({ children }) => {
  const [allBooksTableData, allBooksSetTableData] = useState([]);
  return (
    <AllBooksContext.Provider
      className="Provider"
      value={{ allBooksTableData, allBooksSetTableData }}
    >
      {children}
    </AllBooksContext.Provider>
  );
};

export default AllBooksContextComponent;
