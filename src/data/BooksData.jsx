import axios from "axios";
import { filter } from "lodash";
import dateFormat from "dateformat";

import {
  apiBook,
  apiBooks,
  apiCategory,
  apiGetBorrow,
  apiLoans,
  apiPostBorrow,
  apiPostLoan,
  apiUser,
  getCategoryFromBook,
  loanIsPending,
} from "./ServerResponses";

import { authConnection } from "./common/server";
import { getUser } from "./Auth";

export const getLoans = async () => {
  const { url, config } = authConnection();
  let loans;
  try {
    loans = apiLoans(await axios.get(`${url}/loan`, config));
  } catch (ex) {
    console.log("Error: ", ex, "\nCould not get loans");
    return ex;
  }
  return loans;
};

export const getBook = async (book_id) => {
  const { url, config } = authConnection();
  let book = await axios.get(`${url}/book/${book_id}`, config);
  book = apiBook(book);
  let category = await getCategoryFromBook(book, { reqOptions: config });
  category = apiCategory(category);
  if (category) {
    book.category = category.category_name;
  }
  return book;
};
export const getPendingLoans = async () => {
  const { url, config } = authConnection();
  const loans = apiLoans(await axios.get(`${url}/loan`, config));
  if (loans.length === 0)
    throw new Error("You currently have no loaned books.");
  return loans.filter((loan) => loanIsPending(loan));
};

export const getLoanedBooks = async () => {
  const pendingLoans = await getPendingLoans();
  return await Promise.all(
    pendingLoans.map(async (loan) => await getBook(loan.book_id))
  );
};

export const loanedBooks = async (callback) => {
  const loans = await getLoans();

  const pendingLoans = loans.filter((loan) => loanIsPending(loan));
  const books = [];
  for (let loan of pendingLoans) {
    try {
      const book = await getBook(loan.book_id);
      books.push(book);
    } catch (error) {
      console.log("Failed to get book ", error);
      console.log("The loan: ", loan);
    }
  }

  console.log("Loaned Books: ", books);
  if (callback) callback(books);
  return books;
};

export const returnedLoanedBooks = async (done, error) => {
  const books = [];
  let loans = [];
  try {
    loans = await getLoans();
  } catch (ex) {
    console.log("Error getting loans", ex);
    if (error) return error(ex);
  }
  const paidLoans = filter(loans, (loan) => !loanIsPending(loan));
  for (let loan of paidLoans) {
    try {
      books.push(await getBook(loan.book_id));
    } catch (ex) {
      console.log("Error getting book: " + loan.book_id, ex);
      if (error) return error(ex);
    }
  }
  if (done) done(books);
  return books;
};

export const allBooks = async (done = null, error = null, options = {}) => {
  const { url, config } = authConnection();

  let books = [];
  try {
    books = apiBooks(
      await axios.get(`${url}/book`, {
        ...options,
        ...config,
      })
    );
  } catch (ex) {
    console.log("Failed to fetch all Books: ", ex);
    if (error) return error(ex);
  }
  if (done) return done(books);

  return books;
};

export const getAllBooks = async () => {
  const { url, config } = authConnection();
  const books = apiBooks(
    await axios.get(`${url}/book`, {
      ...config,
    })
  );
  return books;
};

export const getABook = async (book_id) => {
  const { url, config } = authConnection();

  return apiBook(await axios.get(`${url}/book/${book_id}`, config));
};

export const getAUser = async (user_id) => {
  const { url, config } = authConnection();

  return apiUser(await axios.get(`${url}/user/${user_id}`, config));
};

export const borrowBook = async ({ id: book_id }) => {
  const { url, config } = authConnection();

  const user_id = getUser().id;

  console.log("book_id", book_id, "user_id", user_id);

  const borrows = await axios.post(
    `${url}/borrow`,
    { book_id, user_id },
    config
  );
  console.log("borrows: ", apiPostBorrow(borrows));
  return apiPostBorrow(borrows);
};

export const bookAlreadyBorrowed = async (book_id) => {
  const { url, config } = authConnection();
  let borrow;
  try {
    borrow = apiGetBorrow(
      await axios.get(`${url}/borrow?BookId=${book_id}`, config)
    );
  } catch (ex) {
    console.log("Couldn't get if borrowed ", ex);
    throw ex;
  }
  const borrowed = Boolean(borrow.length);
  return { borrowed, theBorrow: borrowed && borrow[0] };
};
export const alreadyBorrowedThisBook = async ({ id: book_id }) => {
  const { url, config } = authConnection();
  const user = getUser();

  //Returns an array of borrows
  const borrow = apiGetBorrow(
    await axios.get(
      `${url}/borrow?book_id=${book_id}&user_id=${user.id}`,
      config
    )
  );

  const borrowed = Boolean(borrow.length);
  return { theBorrow: borrowed && borrow[0], borrowed };
};

export const getBorrow = async (
  book_id = null,
  { page = null, perPage = null } = {}
) => {
  const { url, config } = authConnection();

  const { id: user_id } = getUser();
  const paginationQueryKeys =
    (page && perPage && `&page=${page}&perPage=${perPage}`) || "";
  const filterByBook = (book_id && `&book_id=${book_id}`) || "";
  const filterByUser = (user_id && `&user_id=${user_id}`) || "";

  const filter = `${paginationQueryKeys}${filterByBook}${filterByUser}`;

  const borrow = apiGetBorrow(
    await axios.get(`${url}/borrow?${filter}`, config)
  );
  return borrow;
};

export const getBorrows = async ({
  page = 1,
  pageSize = 8,
  userId = null,
  bookId = null,
  id = null,
} = {}) => {
  const { url, config } = authConnection();

  const pageQueryParams = `page=${page}&per_page=${pageSize}`;
  const userQueryParams = userId ? `&user_id=${userId}` : ``;
  const bookQueryParams = bookId ? `&book_id=${bookId}` : ``;
  const idQueryParams = id ? `&id=${id}` : ``;
  const queryParams = `${pageQueryParams}${userQueryParams}${bookQueryParams}${idQueryParams}`;
  const res = apiGetBorrow(
    await axios.get(`${url}/borrow?${queryParams}`, config)
  );
  console.log("query", queryParams);
  return res;
};

export const deleteBorrow = async ({ id: borrow_id }) => {
  const { url, config } = authConnection();

  console.log("Deleting the borrow", borrow_id);
  const del = await axios.delete(`${url}/borrow/${borrow_id}`, config);

  console.log("deleted borrow", del);

  return del;
};
export const cancelBorrow = async ({ id: borrow_id }) => {
  await deleteBorrow({ id: borrow_id });
  return true;
};

export const approveBorrow = async ({ user_id, book_id, id: borrow_id }) => {
  const { url, config } = authConnection();

  const { id: me } = getUser();
  let due_date = new Date().setMonth(new Date().getMonth() + 1);

  due_date = dateFormat(due_date, "yyyy-mm-dd");

  console.log("approve Borrow", {
    user_id,
    book_id,
    loan_status: "unpaid",
    due_date,
    added_by: me,
  });

  const loan = await axios.post(
    `${url}/loan`,
    {
      user_id,
      book_id,
      loan_status: "unpaid",
      due_date,
      added_by: me,
    },
    config
  );

  await deleteBorrow({ id: borrow_id });
  return apiPostLoan(loan);
};

export const rejectBorrow = async ({ user_id, book_id, id: borrow_id }) => {
  return await deleteBorrow({ id: borrow_id });
};

export const getIfApprovedLoan = async ({ id: book_id }) => {
  const { url, config } = authConnection();

  const loans = await axios.get(`${url}/loan?book_id=${book_id}`, config);
  return Boolean(apiLoans(loans).length);
};

export const getBorrowsAsStaff = async ({ page = 1, perPage = 10 }) => {
  const { url, config } = authConnection();
  console.log(`getBorrowsAsStaff`);
  let borrows = await axios.get(
    `${url}/borrow?page=${page}&perPage=${perPage}`,
    config
  );
  const { data, ...paginationInfo } = borrows;
  console.log("borrows", borrows);
  borrows = apiGetBorrow(borrows);
  const userCache = {};
  const bookCache = {};
  const rows = await Promise.all(
    borrows.map(async ({ book_id, user_id, ...rest }) => {
      let book = bookCache[book_id];
      let user = userCache[user_id];
      const userPromise = axios.get(`${url}/user/${user_id}`, config);
      const bookPromise = axios.get(`${url}/book/${book_id}`, config);
      if (book && !user) user = await userPromise;

      if (user && !book) book = await bookPromise;

      if (!book && !user)
        [book, user] = await Promise.all([bookPromise, userPromise]);

      bookCache[book_id] = book;
      userCache[user_id] = user;
      return {
        book: apiBook(book),
        user: apiUser(user),
        book_id,
        user_id,
        ...rest,
      };
    })
  );

  return { rows, paginationInfo };
};
