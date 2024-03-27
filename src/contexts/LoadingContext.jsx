import { createContext, useState } from "react";

export const loadingContext = createContext({
  booksComp: {
    loading: true,
    setLoading: () => {},
  },
  loanedBooksComp: { loading: true, setLoading: () => {} },
  returnedBooksComp: { loading: true, setLoading: () => {} },
});

const LoadingComponent = ({ children }) => {
  const [booksCompLoading, setBooksCompLoading] = useState(true);
  const [loanedBooksCompLoading, setLoanedBooksCompLoading] = useState(true);
  const [returnedBooksCompLoading, setReturnedBooksCompLoading] =
    useState(true);

  return (
    <loadingContext.Provider
      className="Provider"
      value={{
        booksComp: {
          loading: booksCompLoading,
          setLoading: setBooksCompLoading,
        },
        loanedBooksComp: {
          loading: loanedBooksCompLoading,
          setLoading: setLoanedBooksCompLoading,
        },
        returnedBooksComp: {
          loading: returnedBooksCompLoading,
          setLoading: setReturnedBooksCompLoading,
        },
      }}
    >
      {children}
    </loadingContext.Provider>
  );
};

export default LoadingComponent;
