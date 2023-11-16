import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteRestaurant } from "../../actions/RestaurantActions";

function Restaurant(props) {
  const dispatch = useDispatch();
  const { restaurant: restaurant } = props;

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  const onDeleteClick = (id) => {
    dispatch(deleteRestaurant(id));
  };

  return (
    <div className="bg-white p-3 mb-3 rounded-md shadow-md">
      <div className="container">
        <h2 className="text-2xl font-semibold">Restaurant</h2>
        <div className="p-3 bg-white shadow-md rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 text-center">
                {restaurant.id}
              </h3>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {restaurant.name}
              </h3>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {restaurant.address}
              </h3>
            </div>
            <div className="lg:block hidden">
              <ul className="space-y-4">
                <li>
                  <Link
                    to={`/menuList/${restaurant.id}`}
                    className="text-white hover:text-white focus:outline-none bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 block w-full text-center"
                  >
                    Menu List
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/updateRestaurant/${restaurant.id}`}
                    className="text-white hover:text-white focus:outline-none bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 block w-full text-center"
                  >
                    Update Restaurant
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/orderList/${restaurant.id}`}
                    className="text-white hover:text-white focus:outline-none bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 block w-full text-center"
                  >
                    Order List
                  </Link>
                </li>
                <li>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 block w-full text-center"
                    onClick={() => onDeleteClick(restaurant.id)}
                  >
                    Delete Restaurant
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Restaurant.propTypes = {
  restaurant: PropTypes.object,
};
export default Restaurant;
