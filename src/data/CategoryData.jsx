import axios from "axios";
import { authConnection } from "./common/server";
import { apiCategories, apiCategory } from "./ServerResponses";
import { allBooks } from "./BooksData";
import { forIn } from "lodash";

export const getCategories = async () => {
  const { url, config } = authConnection();
  const categories = apiCategories(await axios.get(`${url}/category`, config));
  return categories;
};

export const getCategory = async (category_id) => {
  const { url, config } = authConnection();
  const category = await axios.get(`${url}/category/${category_id}`, config);
  return apiCategory(category);
};

export const getCategoriesWithMostBooks = async () => {
  const category_ids = {};
  const books = await allBooks();
  books.map(
    (book) =>
      (category_ids[book.category_id] =
        (category_ids[book.category_id] || 0) + 1)
  );
  const categoryIdList = [];
  forIn(category_ids, (bookCount, category_id) => {
    categoryIdList.push(category_id);
  });
  console.log(category_ids);
  //Sort the categoryIds
  categoryIdList.sort((catId1, catId2) => {
    return category_ids[catId1] - category_ids[catId2];
  });
  return await Promise.all(
    categoryIdList
      .slice(Math.min(categoryIdList.length, 5), categoryIdList.length)
      .reverse()
      .map(async (catId) => {
        return await getCategory(catId);
      })
  );
};
