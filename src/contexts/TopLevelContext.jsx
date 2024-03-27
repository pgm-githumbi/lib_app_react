import { QueryClient, QueryClientProvider } from "react-query";
import LoanBooksCtxComponent from "./LoanBooksCtx";
import AllBooksContextComponent from "./AllBooksContext";
import ListGroupContextsComponent from "./ListGroupContexts";
import ReturnedBooksContextComponent from "./ReturnedBooksContext";
import LoadingComponent from "./LoadingContext";

const queryClient = new QueryClient();

const TopLevelContext = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingComponent>
        <ReturnedBooksContextComponent>
          <ListGroupContextsComponent>
            <LoanBooksCtxComponent>
              <AllBooksContextComponent>{children}</AllBooksContextComponent>
            </LoanBooksCtxComponent>
          </ListGroupContextsComponent>
        </ReturnedBooksContextComponent>
      </LoadingComponent>
    </QueryClientProvider>
  );
};

export default TopLevelContext;
