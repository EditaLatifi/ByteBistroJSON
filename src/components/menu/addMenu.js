import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createMenu } from "../../actions/MenuActions";
import Header from "../Layout/Header";

const AddMenu = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const errors = useSelector((state) => state.errorsReducerContent);

  const [state, setState] = useState({
    name: "",
    errors: {},
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newMenu = {
      name: state.name,
    };

    // Dispatch the create action
    dispatch(createMenu(id, newMenu));

    // Reset the form after submission
    setState({
      name: "",
      errors: {},
    });
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h4 className="text-2xl text-center mb-6">Add Menu</h4>
          <hr className="my-4" />
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="mb-4">
              <input
                type="text"
                className={`w-full p-3 border border-gray-300 rounded-md ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Menu Name"
                name="name"
                value={state.name}
                onChange={onChange}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Add Menu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
