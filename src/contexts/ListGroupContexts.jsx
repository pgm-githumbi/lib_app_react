import { createContext, useState } from "react";

// const defaultSidebarLinks = [
//   {
//     visibleName: "All",
//     link: "",
//     parentPath: "/books",
//     activeOn: ["", "all"],
//   },
// ];

export const ListGroupContexts = createContext({
  categoryListGroupLinks: [],
  setCategoryListGroupLinks: () => {},
});

const ListGroupContextsComponent = ({ children }) => {
  const [categoryListGroupLinks, setCategoryListGroupLinks] = useState([]);

  return (
    <ListGroupContexts.Provider
      className="Provider"
      value={{ categoryListGroupLinks, setCategoryListGroupLinks }}
    >
      {children}
    </ListGroupContexts.Provider>
  );
};

export default ListGroupContextsComponent;
