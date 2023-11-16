import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createMenu, getMenu } from "../../actions/MenuActions"; // Import your updateMenu and getMenu actions
import Header from "../Layout/Header";

const UpdateMenu = () => {
  const dispatch = useDispatch();
  const { id, menu_id } = useParams();
  const errors = useSelector((state) => state.errorsReducerContent);
  const menu = useSelector((state) => state.menuReducerContent.menu);

  const [state, setState] = useState({
    id: id,
    name: "",

    errors: {},
  });

  useEffect(() => {
    dispatch(getMenu(id, menu_id));
  }, [dispatch, id, menu_id]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      id: id,
      name: menu.name || "",
      errors: errors,
    }));
  }, [menu, id, errors]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedMenu = {
      id: state.id,
      name: state.name,
    };

    // Dispatch the update action
    dispatch(createMenu(id, updatedMenu));
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h4 className="text-2xl text-center mb-6">Update Menu</h4>
          <hr className="my-4" />
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Menu ID"
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
              Update Menu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMenu;
