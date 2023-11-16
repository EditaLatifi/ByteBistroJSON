import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./menu/menu";
import { getMenus } from "../actions/MenuActions";
import { Link, useParams } from "react-router-dom";
import Header from "./Layout/Header";

import CreateButton from "./menu/CreateButton";

const MenuList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const menuList = useSelector((state) => state.menuReducerContent.menus);

  useEffect(() => {
    dispatch(getMenus(id));
  }, [dispatch, id]); // Corrected the dependency array

  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <CreateButton id={id} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {menuList.map((menu) => (
            <Menu key={menu.id} menu={menu} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
