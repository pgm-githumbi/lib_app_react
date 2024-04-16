import { createContext, useState } from "react";

export const LoanBooksContext = createContext({
  tableData: [],
  setTableData: () => {},
});
const LoanBooksCtxComponent = ({ children }) => {
  const [tableData, setTableData] = useState(() => []);

  return (
    <LoanBooksContext.Provider
      className="Provider"
      value={{
        tableData: tableData,
        setTableData: setTableData,
      }}
    >
      {children}
    </LoanBooksContext.Provider>
  );
};

export default LoanBooksCtxComponent;
