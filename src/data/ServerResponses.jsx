import axios from "axios";

export const apiLogin = (apiLoginResponse) => {
  return apiLoginResponse.data.data;
};

export const apiRegister = (apiRegisterResponse) => {
  const { token, user } = apiRegisterResponse.data.data;
  return { token, user };
};

export const apiRegisterError = (apiRegisterResponse) => {
  const message =
    apiRegisterResponse?.response?.data?.message ||
    apiRegisterResponse?.message;
  const errors = apiRegisterResponse?.response?.data?.errors;
  let status = null;
  let statusText = null;
  if (apiRegisterResponse?.response)
    ({ status, statusText } = apiRegisterResponse?.response);
  return { status, statusText, message, errors };
};
export const apiBook = (apiBookResponse) => {
  return apiBookResponse?.data?.data;
};
export const apiUser = (apiUserResponse) => {
  return apiUserResponse.data;
};

export const apiBooks = (apiBooksResponse) => {
  return apiBooksResponse.data.data.data;
};

export const apiPostBorrow = (apiBorrowResponse) => {
  return apiBorrowResponse.data.data.borrow;
};

export const apiPostBorrowError = (apiBorrowErrorResponse) => {
  return apiBorrowErrorResponse.response.data.message;
};

export const apiGetBorrow = (apiGetBorrowResponse) => {
  return apiGetBorrowResponse.data.data.data;
};

export const apiGetBorrowWithPagination = (apiGetBorrowResponse) => {
  return apiGetBorrowResponse.data.data;
};

export const apiLoans = (apiLoansResponse) => {
  return apiLoansResponse.data.data;
};

export const apiPostLoan = (apiPostLoanResponse) => {
  return apiPostLoanResponse.data.data;
};

export const apiCategory = (apiCategoryResponse) => {
  return apiCategoryResponse.data.data;
};

export const apiCategories = (apiCategoriesResponse) => {
  return apiCategoriesResponse.data.data;
};

export const loanIsPending = (loan) => {
  return loan.loan_status === "unpaid";
};
export const getCategoryFromBook = async (book, { reqOptions }) => {
  if (book.category) return book.category;
  if (book.category_id) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const category = await axios.get(
      `${apiUrl}/category/${book.category_id}`,
      reqOptions
    );
    return category;
  }
};
