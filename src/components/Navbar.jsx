import React, { Component, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const collapseClass = collapsed ? "" : "show";
  const navbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setCollapsed(true);
      }
    }

    document.addEventListener("mouseleave", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mouseleave", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light border-bottom"
      ref={navbarRef}
    >
      <div className="container-fluid">
        <ul className="nav nav-underline d-flex">
          <li className="nav-item">
            <i className="fa-solid fa-globe px-2"></i>
            <span className="navbar-brand mb-0 h2 navbar-text">Library</span>
          </li>

          <SmartLink
            linkName="Books"
            iconClass="fa-solid fa-book"
            href="/home/books"
          />
          <SmartLink
            linkName="My Books"
            iconClass="fa-solid fa-book-open"
            href="/home/borrowed_books"
          />

          {/* <div className=" d-flex justify-content-start"> */}
          <li className="nav-item">
            <button
              className="navbar-toggler btn btn-sm ms-auto"
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
              {/* <i class="fa-solid fa-bars"></i> */}
            </button>
          </li>
          {/* </div> */}
          <div className={`collapse navbar-collapse ${collapseClass}`}>
            <ul className="navbar-nav nav-underline  ">
              <SmartLink
                linkName="Staff Panel"
                iconClass={`fa-solid fa-user-tie`}
                href="/home/staff"
              />
              <SmartLink
                linkName="Logout"
                iconClass={`fa-solid fa-arrow-right-from-bracket`}
                href="/logout"
              />
            </ul>
          </div>
        </ul>
      </div>
    </nav>
  );
};

const SmartLink = ({ href, linkName, iconClass = null, ...props }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(href);
  const active = isActive ? "active" : "";
  return (
    <li className="nav-item align-items-end">
      <div className="d-flex align-items-center ">
        <span className="px-2">
          <Link to={href} className={`nav-link ${active}`}>
            {iconClass && <i className={`${iconClass}`}></i>}
            <span className="navbar-text px-2">{linkName}</span>
          </Link>
        </span>
      </div>
    </li>
  );
};

export default Navbar;
