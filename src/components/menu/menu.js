import React from "react";
import { deleteMenu } from "../../actions/MenuActions";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

function Menu(props) {
  console.log(props);
  const dispatch = useDispatch();

  const onDeleteClick = (emp_id) => {
    dispatch(deleteMenu(emp_id));
  };

  const { menu } = props;
  const { id } = useParams();

  return (
    <div className="bg-white p-3 mb-3 rounded-md shadow-md">
      <div className="container">
        <div className="p-3 bg-white shadow-md rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 text-center">
                {menu.id}
              </h3>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {menu.name}
              </h3>
            </div>
            <div className="lg:block hidden">
              <ul className="space-y-4">
                <li>
                  <Link
                    to={`/menuItemList/${menu.id}`}
                    className="text-white hover:text-white focus:outline-none bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 block w-full text-center"
                  >
                    Menu Item
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/updateMenu/${id}/${menu.id}`}
                    className="text-white hover:text-white focus:outline-none bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 block w-full text-center"
                  >
                    Update Menu
                  </Link>
                </li>
                <li>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 block w-full text-center"
                    onClick={() => onDeleteClick(menu.id)}
                  >
                    Delete Menu
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

export default Menu;
