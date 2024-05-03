import { useQuery } from "react-query";
import CommonListGroup from "../common/CommonListGroup";
import { getCategoriesWithMostBooks } from "../data/CategoryData";
const defaultSidebarLinks = [
  {
    visibleName: "All",
    link: "",
    parentPath: "/home/books",
    activeOn: ["", "all"],
  },
];

const createCategoryLink = ({ category_name, id }) => {
  return {
    visibleName: category_name,
    link: `${id}`,
    parentPath: "/home/books",
    activeOn: [`${id}`],
  };
};
const CategoryListGroup = () => {
  const {
    data: categories,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["categories with most books"],
    queryFn: getCategoriesWithMostBooks,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="list-group py-4">
        <div className="list-group-item text-info" role="alert">
          Loading...
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <div className="list-group py-4">
        <div className="list-group-item text-danger" role="alert">
          {" "}
          An error occurred
        </div>
      </div>
    );

  if (isSuccess) {
    const categoryLinks = categories.map((category) =>
      createCategoryLink(category)
    );
    return (
      <CommonListGroup args={[...defaultSidebarLinks, ...categoryLinks]} />
    );
  }
};

export default CategoryListGroup;
