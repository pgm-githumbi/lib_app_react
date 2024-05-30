import React from "react";
import { useLocation } from "react-router-dom";
import { ListGroup, ListGroupItem, NavLink } from "reactstrap";

const MyBooksSideBar = (props) => {
  console.log("props.args: ", props.args);
  const location = useLocation();
  console.log(location);
  return (
    <div className="col-sm-auto py-4">
      <ListGroup>
        {props.args.map((item) => (
          <Item
            key={item.link}
            href={item.link}
            tag="a"
            itemName={item.visibleName}
          />
        ))}
      </ListGroup>
    </div>
  );
};

const Item = ({ ...props }) => {
  const { href, itemName, ...rest } = props;
  const location = useLocation();
  const isActive = location.pathname.search(href) !== -1;

  console.log(
    `${itemName} is active set to ${isActive}; Location: ${location.pathname} while href: ${href}`
  );
  return (
    <ListGroupItem
      active={isActive}
      href={href}
      onClick={function noRefCheck() {}}
      {...rest}
    >
      <NavLink to={href} onClick={function noRefCheck() {}}>
        {itemName}
      </NavLink>
    </ListGroupItem>
  );
};

export default MyBooksSideBar;
