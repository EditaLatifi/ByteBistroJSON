import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createRestaurant,
  getRestaurant,
} from "../../actions/RestaurantActions"; // Import your updateRestaurant action
import Header from "../Layout/Header";

const UpdateRestaurant = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const errors = useSelector((state) => state.errorsReducerContent);
  const restaurant = useSelector(
    (state) => state.restaurantReducerContent.restaurant
  );

  const [state, setState] = useState({
    id: id,
    name: "",
    address: "",
    errors: {},
  });

  useEffect(() => {
    // Fetch the restaurant data if needed
    dispatch(getRestaurant(id));
  }, [dispatch, id]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      id: id,
      name: restaurant.name || "",
      address: restaurant.address || "",
      errors: errors,
    }));
  }, [restaurant, id, errors]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedRestaurant = {
      id: state.id,
      name: state.name,
      address: state.address,
    };

    // Dispatch the update action
    dispatch(createRestaurant(updatedRestaurant));
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h4 className="text-2xl text-center mb-6">Update Restaurant</h4>
          <hr className="my-4" />
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Restaurant ID"
                name="id"
                value={state.id}
                onChange={onChange}
                disabled
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className={`w-full p-3 border border-gray-300 rounded-md ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Restaurant Name"
                name="name"
                value={state.name}
                onChange={onChange}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                className={`w-full p-3 border border-gray-300 rounded-md ${
                  errors.address ? "border-red-500" : ""
                }`}
                placeholder="Department Address"
                name="address"
                value={state.address}
                onChange={onChange}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Update Restaurant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRestaurant;
