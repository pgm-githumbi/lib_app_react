import { Link, matchPath, useLocation } from "react-router-dom";

const CommonListGroup = (props) => {
  // const location = useLocation();
  // const pathname = location.pathname;

  return (
    <div className="col-sm-auto py-4">
      <div className="list-group">
        {props.args.map((item) => (
          <Item key={item.link} {...item} />
        ))}
      </div>
    </div>
  );
};

const Item = ({ link, visibleName, parentPath, activeOn, ...rest }) => {
  const { pathname } = useLocation();
  let isActive = false;
  for (let target of activeOn) {
    if (matchPath(pathname, `${parentPath}/${target}`)) {
      isActive = true;
      break;
    }
  }

  const listItemClass = `list-group-item list-group-item-action`;
  const fullclassName = isActive ? `${listItemClass} active` : listItemClass;
  return (
    <Link
      to={link}
      active={`${isActive}`}
      className={`${fullclassName} text-decoration-none text-dark`}
      {...rest}
    >
      {visibleName}{" "}
    </Link>
  );
};

export default CommonListGroup;
