import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRestaurant } from "../../actions/RestaurantActions"; // Import your createRestaurant action
import Header from "../Layout/Header";

const AddRestaurant = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorsReducerContent);
  const id = undefined;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const onChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Create a restaurant object with the form data
    const newRestaurant = {
      id,
      name,
      address,
    };

    // Dispatch the createRestaurant action with the new restaurant data
    console.log(newRestaurant);
    dispatch(createRestaurant(newRestaurant));

    // Clear the form fields after submission
    setName("");
    setAddress("");
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-6 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow p-8 sm:p-10">
            <h5 className="text-center text-3xl">Create Restaurant Form</h5>
            <hr className="my-4" />

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  className={`w-full p-3 border border-gray-300 rounded-md ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Restaurant name"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
                <label htmlFor="address" className="block text-gray-700">
                  Restaurant Address
                </label>
                <input
                  type="text"
                  className={`w-full p-3 border border-gray-300 rounded-md ${
                    errors.address ? "border-red-500" : ""
                  }`}
                  placeholder="Restaurant address"
                  name="address"
                  value={address}
                  onChange={onChange}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
                >
                  Create Restaurant
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
