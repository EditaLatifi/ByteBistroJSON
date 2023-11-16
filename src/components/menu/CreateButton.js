import React from "react";
import { Link } from "react-router-dom";

const CreateButton = ({ id }) => {
  return (
    <div className="my-4">
      <Link
        to={`/addMenu/${id}`}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Create Menu
      </Link>
    </div>
  );
};

export default CreateButton;
