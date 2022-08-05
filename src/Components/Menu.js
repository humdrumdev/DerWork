import { Link } from "react-router-dom";
import authService from "../services/auth/auth.service";
import UserMenu from "./TopRightMenu/UserMenu";
import Sign from "./TopRightMenu/Sign";
import logo from "../assets/logo.png"

const Menu = ({ mode }) => {

  const menus = [
    { label: "Home", link: "/" },
    { label: "Find Jobs", link: "/search" },
    { label: "Companies", link: "/companies" },
  ]

  return (
    <header className="pxp-header fixed-top">
      <div className="pxp-container">
        <div className="pxp-header-container">
          <div className="pxp-logo-nav-container">
            <div className="pxp-logo">
              {/* <a href="/" className="pxp-animate">
                <span style={{ color: "var(--pxpMainColor)" }}>Der</span>Work
              </a> */}
              <img width={132} src={logo} alt="logo" />

            </div>
            <div className={mode ? "pxp-nav-trigger  navbar d-xl-none flex-fill pxp-light" : "pxp-nav-trigger  navbar d-xl-none flex-fill"}>
              <a
                role="button"
                href="/"
                data-bs-toggle="offcanvas"
                data-bs-target="#pxpMobileNav"
                aria-controls="pxpMobileNav"
              >
                <div className="pxp-line-1"></div>
                <div className="pxp-line-2"></div>
                <div className="pxp-line-3"></div>
              </a>
              <div
                className="offcanvas offcanvas-start pxp-nav-mobile-container"
                tabIndex="-1"
                id="pxpMobileNav"
              >
                <div className="offcanvas-header">

                  <Link to="/" className="pxp-close-btn">
                    <img height={22} src={logo} alt="logo" />
                </Link>
                  <button id="MobileNav"
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <nav className="pxp-nav-mobile">
                    <ul className="navbar-nav justify-content-end flex-grow-1">
                      {menus.map((menu, index) => (
                        <li key={index} className="nav-item dropdown">
                          <Link to={menu.link} className="nav-link" onClick={() => {
                            document.getElementById("MobileNav").click();
                          }
                          }>
                            {menu.label}
                          </Link>
                        </li>
                      ))}

                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <nav className={mode ? "pxp-nav dropdown-hover-all d-none d-xl-block pxp-light" : "pxp-nav dropdown-hover-all d-none d-xl-block"}>
              <ul>
                {menus.map((menu, index) => (
                  <li key={index}>
                    <Link to={menu.link}>{menu.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <nav className="pxp-user-nav pxp-on-light">

            {/* <Link to="dashboard/post"><span className="btn rounded-pill pxp-nav-btn">
              Post a Job
            </span>
            </Link> */}

            {
              !authService.getCurrentUser() ?
                <Sign />
                :
                <UserMenu />
            }


          </nav>
        </div>

      </div>

    </header>
  );
};

export default Menu;
