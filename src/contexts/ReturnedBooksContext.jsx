import { createContext, useState } from "react";

export const ReturnedBooksContext = createContext({
  returnedBooks: [],
  setReturnedBooks: () => {},
});

const ReturnedBooksContextComponent = ({ children }) => {
  const [returnedBooks, setReturnedBooks] = useState([]);

  return (
    <ReturnedBooksContext.Provider value={{ returnedBooks, setReturnedBooks }}>
      {children}
    </ReturnedBooksContext.Provider>
  );
};

export default ReturnedBooksContextComponent;
