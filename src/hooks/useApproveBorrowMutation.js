import { useMutation } from "react-query";
import { approveBorrow } from "../data/BooksData";

const useApproveBorrowMutation = () => {
  const mutation = useMutation(approveBorrow);
  return mutation;
};

export default useApproveBorrowMutation;
