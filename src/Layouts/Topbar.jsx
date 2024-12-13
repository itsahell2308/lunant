import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Components";
import Icon from "../assets/icons/Icon";
import { logoutUser } from "../store/user/user-action";
import { uiActions } from "../store/ui/ui-slice";

const Topbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.ui);
  const [showHide, setShowHide] = useState(false);

  useEffect(() => {
    if (theme) {
      const root = document.documentElement;
      root.setAttribute("data-bs-theme", theme);
      root.setAttribute("data-startbar", theme);
    }
  }, [theme]);

  const handleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-bs-theme");

    if (currentTheme === "dark") {
      dispatch(uiActions.setTheme("light"));
    } else {
      dispatch(uiActions.setTheme("dark"));
    }
  };

  const handleSideCollapsed = () => {
    const body = document.querySelector("body");
    const currentSize = body.getAttribute("data-sidebar-size");
    if (currentSize && currentSize !== "default") {
      body.setAttribute("data-sidebar-size", "default");
    } else {
      body.setAttribute("data-sidebar-size", "collapsed");
    }
  };

  const handleLogout = async () => {
    await logoutUser(dispatch);
  };

  return (
    <header className="topbar d-print-none">
      <div className="container-fluid">
        <nav
          className="topbar-custom d-flex justify-content-between"
          id="topbar-custom"
        >
          <ul className="topbar-item list-unstyled d-inline-flex align-items-center mb-0">
            <li>
              <Button
                className="nav-link mobile-menu-btn nav-icon"
                icon="MdMenu"
                onClick={handleSideCollapsed}
              />
            </li>
            <li className="hide-phone app-search">
              <form role="search" action="#" method="get">
                <input
                  type="search"
                  name="search"
                  className="form-control top-search mb-0"
                  placeholder="Search here..."
                />
                <Button className="iconoir-search" icon="FaSearch" />
              </form>
            </li>
          </ul>
          <ul className="topbar-item list-unstyled d-inline-flex align-items-center mb-0">
            <li className="topbar-item">
              <a className="nav-link nav-icon" href="#" onClick={handleTheme}>
                {theme === "dark" ? (
                  <Icon name="FaSun" className="dark-mode" />
                ) : (
                  <Icon name="FaRegMoon" className="light-mode" />
                )}
              </a>
            </li>
            <li className="dropdown topbar-item position-relative">
              <a
                className="nav-link dropdown-toggle arrow-none nav-icon w-auto"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
                onClick={() => setShowHide(!showHide)}
              >
                {user?.username}
              </a>
              <div
                className={`dropdown-menu overflow-hidden py-0 ${
                  showHide ? "show" : ""
                }`}
              >
                <a
                  className="dropdown-item text-danger pt-2 pb-3"
                  onClick={handleLogout}
                >
                  <Icon
                    name="FaPowerOff"
                    className="fs-18 me-1 align-text-bottom"
                  />
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Topbar;
