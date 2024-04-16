import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListGroup, ListGroupItem, NavLink } from "reactstrap";

const Sidebar = () => {
  return (
    <div className="col-sm-auto">
      <ListGroup>
        <Item></Item>
      </ListGroup>
    </div>
  );
};

const MyBooksSideBar = (props) => {
  console.log("props.args: ", props.args);
  const location = useLocation();
  const pathname = location.pathname;
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
