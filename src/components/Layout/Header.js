import React from "react";
import { Link } from "react-router-dom";
// reactstrap components

function Header() {

  return (
    <div>
    <nav className="bg-gradient-to-br from-red-800 via-red-600 to-red-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-4xl font-extrabold hover:text-yellow-400">
        RestaurantPro
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/restaurants"
              className="text-white text-xl hover:text-blue-200"
            >
              Restaurants
            </Link>
            <Link
              to="/menuList/:id"
              className="text-white text-xl hover:text-blue-200"
            >
              Menu
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

