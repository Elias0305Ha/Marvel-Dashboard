import React from "react";
import Header from "./Header.jsx";

// this is the NavBar component that will be used to display the NavBar on the page
const NavBar = () => {

return (
      <div className="sideNav">
            <br></br>
            <Header />
            <br></br>
            <br></br>
            <h1>📰 Dashboard</h1>
            <h1>🔍 Search</h1>
            <h1>🏠 About</h1>
      </div>
      )
}

export default NavBar;