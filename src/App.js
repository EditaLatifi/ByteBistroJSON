import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AddRestaurant from "./components/restaurants/AddRestaurant";
import UpdateRestaurant from "./components/restaurants/UpdateRestaurant";
import Restaurants from "./components/restaurants";
import MenuList from "./components/menus";
import UpdateMenu from "./components/menu/updateMenu";
import AddMenu from "./components/menu/addMenu";
import RestaurantPage from "./components/restaurantLandingPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          {/* Render the Header for all routes except Landing, Login, and Register */}
          <Routes>
            <Route path="/" element={<RestaurantPage />} />        
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/addRestaurant" element={<AddRestaurant />} />
            <Route path="/updateRestaurant/:id" element={<UpdateRestaurant />}/>
            <Route path="/menuList/:id" element={<MenuList />} />
            <Route path="/updateMenu/:id/:menu_id" element={<UpdateMenu />} />
            <Route path="/addMenu/:id" element={<AddMenu />} />
            <Route path="/cook" element={<AddMenu />} />
            <Route path="/waiter" element={<AddRestaurant />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
export default App;
