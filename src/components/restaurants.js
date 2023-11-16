import React, { useEffect } from "react";
import Restaurant from "./restaurants/Restaurant";
import CreateButton from "./restaurants/CreateButton";
import { getRestaurants } from "../actions/RestaurantActions";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Layout/Header";

function Restaurants() {
  const dispatch = useDispatch();
  const restaurants = useSelector(
    (state) => state.restaurantReducerContent.restaurants
  );

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <CreateButton />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
