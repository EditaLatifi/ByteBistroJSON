module.exports = function (server) {
  // Import necessary functions and data
  const { readLastUsedMenuId } = require("../utils"); // Update to match your utility function for menu IDs
  let menuIdCounter = readLastUsedMenuId();
  const jsonServer = require("json-server");
  const router = jsonServer.router("db.json");

  server.post("/api/menus/:id", (request, response) => {
    const restaurantId = parseInt(request.params.id);
    const requestBody = request.body;
    const restaurantsData = router.db.get("restaurants").value();
    const index = restaurantsData.findIndex(
      (restaurant) => restaurant.id === restaurantId
    );
    if (index === -1) {
      response.status(404).json({ error: "Restaurant not found" });
    } else {
      // Get the restaurant's menu list
      const restaurant = restaurantsData[index];
      const menuList = restaurant.menus;
      if (requestBody.id === undefined) {
        let menuId;
        menuId = menuIdCounter++;
        const newMenu = {
          id: menuId,
          name: requestBody.name,
          items: requestBody.items, // Add other menu properties as needed
        };
        // Add the new menu to the list
        menuList.push(newMenu);
        // Update the restaurant's data
        restaurant.menus = menuList;
        // Save the updated data
        router.db.set("restaurants", restaurantsData).write();
        const lastUsedId = router.db.get("lastUsedId").value();
        lastUsedId.menuId = menuIdCounter;
        router.db.set("lastUsedId", lastUsedId).write();
        response.json(restaurant);
      } else {
        // Find the index of the menu within the restaurant's menu_list
        const menuIndex = restaurant.menus.findIndex(
          (menu) => menu.id === parseInt(requestBody.id)
        );
        if (menuIndex === -1) {
          response
            .status(404)
            .json({ error: "Menu not found in the restaurant" });
            console.log({ error: "Menu not found in the restaurant" });
        } else {
          // Update the existing menu with the new data
          requestBody.id = parseInt(requestBody.id);
          const updatedMenu = {
            id: requestBody.id,
            name: requestBody.name,
            items: requestBody.items, // Update other menu properties as needed
          };
          restaurant.menus[menuIndex] = {
            ...restaurant.menus[menuIndex],
            ...updatedMenu,
          };
          // Save the updated data
          router.db.set("restaurants", restaurantsData).write();
          response.json(restaurant);
        }
      }
    }
  });

  server.get("/api/menus/list/:id", (request, response) => {
    const restaurantId = parseInt(request.params.id);
    const restaurantsData = router.db.get("restaurants").value();
    const restaurant = restaurantsData.find(
      (restaurant) => restaurant.id === restaurantId
    );
    if (!restaurant) {
      response.status(404).json({ error: "Restaurant not found" });
    } else {
      const menuList = restaurant.menus;
      response.json(menuList);
    }
  });

  server.get("/api/menus/:rest_id/:id", (request, response) => {
    const restaurantId = parseInt(request.params.rest_id);
    const menuId = parseInt(request.params.id);
    const restaurantsData = router.db.get("restaurants").value();
    const restaurant = restaurantsData.find(
      (restaurant) => restaurant.id === restaurantId
    );

    if (!restaurant) {
      response.status(404).json({ error: "Restaurant not found" });
    } else {
      const menuList = restaurant.menus;

      if (!menuList || !Array.isArray(menuList)) {
        response
          .status(500)
          .json({ error: "Invalid menu list in the restaurant data" });
      } else {
        const menu = menuList.find((menu) => menu.id === menuId);

        if (!menu) {
          response
            .status(404)
            .json({ error: "Menu not found in the restaurant" });
        } else {
          response.json(menu);
        }
      }
    }
  });

  server.delete("/api/menus/delete/:id", (request, response) => {
    const menuId = parseInt(request.params.id);
    const restaurantsData = router.db.get("restaurants").value();
    // Flag to track if the menu was found and deleted
    let menuDeleted = false;
    restaurantsData.forEach((restaurant) => {
      const menuIndex = restaurant.menus.findIndex(
        (menu) => menu.id === menuId
      );
      if (menuIndex !== -1) {
        // Remove the menu from the restaurant's menu_list
        restaurant.menus.splice(menuIndex, 1);
        menuDeleted = true;
      }
    });
    if (menuDeleted) {
      // Save the updated data
      router.db.set("restaurants", restaurantsData).write();
      response.json({ message: "Menu deleted successfully" });
    } else {
      response.status(404).json({ error: "Menu not found in any restaurant" });
    }
  });
};
