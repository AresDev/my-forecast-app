import React from "react";
import './Header.scss';

const Header = () => {
  return (
    <nav className="ares-header">
      {/* <div className="ares-logo">
            <FontAwesomeIcon icon={["fal", "coffee"]} />
          </div> */}
      <h1 className="header-text">My Forecast App</h1>
    </nav>
  );
};

export default Header;
