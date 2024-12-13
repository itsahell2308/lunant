import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import Icon from "../assets/icons/Icon";
import { Image } from "../Components";
import { uiActions } from "../store/ui/ui-slice";
import { FaArrowLeft } from "react-icons/fa";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [activeSections, setActiveSections] = useState({
    Games: false,
    reports: false,
    roleManagement: false,
    globalSettings: false,
    configuration: false,
  });

  const toggleSection = (section) => {
    dispatch(uiActions.setHeading(section));
    setActiveSections((prevState) => {
      const isCurrentlyActive = prevState[section];

      const newSections = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === section ? !isCurrentlyActive : false;
        return acc;
      }, {});

      return newSections;
    });
  };
  const handleSideCollapsed = () => {
    const body = document.querySelector("body");
    const currentSize = body.getAttribute("data-sidebar-size");

    if (currentSize === "default") {
      body.setAttribute("data-sidebar-size", "collapsed");
    } else {
      body.setAttribute("data-sidebar-size", "default");
    }
  };

  return (
    <>
      <aside className="startbar d-print-none">
        <div className="brand">
          <NavLink to="/" className="logo">
            <span className="">
              <Image
                src="/assets/images/logo.png"
                className="logo-lg logo-light"
              />
            </span>
          </NavLink>
          <span className="arrow_sidebar_icon" onClick={handleSideCollapsed}>
            <Icon name="FaArrowLeft" />
          </span>
        </div>
        <div className="startbar-menu">
          <div
            className="startbar-collapse"
            id="startbarCollapse"
            data-simplebar
          >
            <div className="d-flex align-items-start flex-column w-100">
              <ul className="navbar-nav mb-auto w-100">
                <li className="menu-label mt-2">
                  <span>Master</span>
                </li>
                <li className={`nav-item`}>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to={{
                      pathname: "/",
                      state: { heading: "Dashboard" }, // Passing the state here
                    }}
                    onClick={() => toggleSection("Dashboard")}
                  >
                    <Icon
                      name="MdDashboard"
                      className="iconoir-report-columns menu-icon"
                    />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li className={`nav-item`}>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/commentary/image-upload"
                    onClick={() => toggleSection("Upload")}
                  >
                    <Icon
                      name="FaUpload"
                      className="iconoir-report-columns menu-icon"
                    />
                    <span>Upload</span>
                  </NavLink>
                </li>
                <li className={`nav-item`}>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/commentary/payment-gateway"
                    onClick={() => toggleSection("Payment Gateway")}
                  >
                    <Icon
                      name="MdOutlinePayments"
                      className="iconoir-report-columns menu-icon"
                    />
                    <span>Payment Gateway</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link arro_icon"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("Games");
                    }}
                    aria-expanded={activeSections.Games}
                  >
                    <Icon
                      name="FaGamepad"
                      className="iconoir-task-list menu-icon"
                    />
                    <span>Games</span>
                  </Link>
                  <div
                    className={`collapse ${activeSections.Games ? "show" : ""}`}
                    id="sidebarTransactions"
                  >
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/eventmaster/sports"}
                        >
                          Sports
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/eventmaster/tournaments"}
                        >
                          Tournaments
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/eventmaster/matches"}
                        >
                          Matches
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/eventmaster/market"}
                        >
                          Markets
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/eventmaster/fancy"}
                        >
                          Fancy
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/eventmaster/line"}
                        >
                          Line
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/eventmaster/bookmaker"}
                        >
                          Bookmaker
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/eventmaster/oddeven"}
                        >
                          Odd Even
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/eventmaster/ImportRadheFancy"}
                        >
                          Import Radhe Fancy
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/eventmaster/ImportIndiaFancy"}
                        >
                          Import India Fancy
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("reports");
                    }}
                    aria-expanded={activeSections.reports}
                  >
                    <Icon
                      name="FaList"
                      className="iconoir-task-list menu-icon"
                    />

                    <span>Reports</span>
                  </Link>
                  <div
                    className={`collapse ${
                      activeSections.reports ? "show" : ""
                    }`}
                    id="sidebarTransactions"
                  >
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/reports/openmarket"}
                        >
                          Open Market
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/reports/settledmarket"}
                        >
                          Settle Market
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/reports/cancelmarket"}
                        >
                          Cancel Market
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/reports/casinomarket"}
                        >
                          Casino Market
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("roleManagement");
                    }}
                    aria-expanded={activeSections.roleManagement}
                  >
                    <Icon
                      name="MdManageAccounts"
                      className="iconoir-task-list menu-icon"
                    />

                    <span>Role Management</span>
                  </Link>
                  <div
                    className={`collapse ${
                      activeSections.roleManagement ? "show" : ""
                    }`}
                    id="sidebarTransactions"
                  >
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/rolemanager/manageusers"}
                        >
                          Manage Users
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/rolemanager/roles"}
                        >
                          Roles
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/rolemanager/moduleaccess"}
                        >
                          Module Access
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("globalSettings");
                    }}
                    aria-expanded={activeSections.globalSettings}
                  >
                    <Icon
                      name="MdSettings"
                      className="iconoir-task-list menu-icon"
                    />

                    <span>Global Settings</span>
                  </Link>
                  <div
                    className={`collapse ${
                      activeSections.globalSettings ? "show" : ""
                    }`}
                    id="sidebarTransactions"
                  >
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/globalsettings/gamesettings"}
                        >
                          Game Settings
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/globalsettings/usersettings"}
                        >
                          User Settings
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/globalsettings/whitelabelsettings"}
                        >
                          WhiteLabel Settings
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("configuration");
                    }}
                    aria-expanded={activeSections.configuration}
                  >
                    <Icon
                      name="MdSettingsSuggest"
                      className="iconoir-task-list menu-icon"
                    />

                    <span>Configuration</span>
                  </Link>
                  <div
                    className={`collapse ${
                      activeSections.configuration ? "show" : ""
                    }`}
                    id="sidebarTransactions"
                  >
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/config/reactions"}
                        >
                          Reactions
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/config/reopencancellist"}
                        >
                          Re-Open/Cancel List
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/config/matchresult"}
                        >
                          Match Result
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/config/livetv"}
                        >
                          Live TV
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/config/import"}
                        >
                          Import
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/config/importdream"}
                        >
                          Import Dream
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/config/apisettings"}
                        >
                          Api Settings
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/config/chipssettings"}
                        >
                          Chips Settings
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/config/rulessettings"}
                        >
                          Rules Settings
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                          }
                          to={"/config/welcomemsg"}
                        >
                          Welcome Message
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div
        className="startbar-overlay d-print-none"
        onClick={handleSideCollapsed}
      ></div>
    </>
  );
};

export default Sidebar;
