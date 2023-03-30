import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import baLogo from "../../images/logo-light.svg";
import ErrorPage from "../../pages/error/ErrorPage.js";
import styles from "./Layout.module.scss";

function Layout(props) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  const v1GoerliRoutes = []

  return (
    <>
      <Container>
        <header className="mb-4">
          <Navbar expand="md" className="fw-bolder" dark container={false}>
            <NavbarBrand className={styles.navbarBrand} tag={Link} to="/">
              <img className={styles.logo} src="#" alt="Ajna" />
            </NavbarBrand>
            <Collapse isOpen={isNavbarOpen} navbar>
              <Nav className="flex-grow-1 justify-content-right" navbar>
                <NavItem>
                  <NavLink className={styles.navLink} tag={Link} to="/">
                    Home
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            <NavbarToggler onClick={toggleNavbar} />
          </Navbar>
        </header>

        <main>
          <Routes>
            {/* V1 Goerli */}
            {v1GoerliRoutes.map((route) => {
              return (
                <Route key={route.path} path={route.path} element={route.element} />
              );
            })}

            {/* Catch all */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </Container>

      <footer className="mt-4 text-center p-3">
        <div className="d-flex justify-content-center align-items-baseline gray small mb-1">
          <img src={baLogo} alt="blockanalitica" className={styles.footerLogo} />
          &copy;2023
        </div>
      </footer>
    </>
  );
}

export default Layout;
