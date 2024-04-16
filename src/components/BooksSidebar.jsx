import { ListGroup, ListGroupItem, NavLink } from "reactstrap";
import { useLocation, Link } from "react-router-dom";

const BooksSidebar = () => {
  return (
    <div className="col-sm-auto justify-content-md-center">
      <ListGroup>
        <Item href="inde" itemName="All books" />
        <Item href="" itemName="thriller" />
      </ListGroup>
    </div>
  );
};

const Item = ({ ...props }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(props.href);
  return (
    <ListGroupItem isActive={isActive} {...props}>
      <NavLink to={props.href} onClick={function noRefCheck() {}}>
        {props.itemName}
      </NavLink>
    </ListGroupItem>
  );
};

export default BooksSidebar;
