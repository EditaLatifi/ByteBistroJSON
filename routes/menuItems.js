module.exports = function (server) {
    // Import necessary functions and data
    const { readLastUsedMenuItemId } = require("../utils"); // Update to match your utility function for menu item IDs
    let menuItemIdCounter = readLastUsedMenuItemId();
    const jsonServer = require("json-server");
    const router = jsonServer.router("db.json");
  
    server.post("/api/menuItems/:rest_id/:menu_id", (request, response) => {
      const restaurantId = parseInt(request.params.rest_id);
      const menuId = parseInt(request.params.menu_id);
      const restaurantsData = router.db.get("restaurants").value();
      const restaurant = restaurantsData.find((restaurant) => restaurant.id === restaurantId);
  
      if (!restaurant) {
        response.status(404).json({ error: "Restaurant not found" });
      } else {
        const menu = restaurant.menu_list.find((menu) => menu.id === menuId);
        if (!menu) {
          response.status(404).json({ error: "Menu not found in the restaurant" });
        } else {
          const requestBody = request.body;
          // Always create a new menu item using POST
          createMenuItem(menu, requestBody, response, restaurantsData);
        }
      }
    });
  
    // Function to create a new menu item
    function createMenuItem(menu, requestBody, response, restaurantsData) {
      // Generate a new menu item
      const newMenuItem = {
        id: menuItemIdCounter++,
        name: requestBody.name,
        description: requestBody.description,
        price: parseFloat(requestBody.price),
      };
      // Add the new menu item to the menu's item list
      menu.items.push(newMenuItem);
      router.db.set("restaurants", restaurantsData).write();
      const lastUsedId = router.db.get("lastUsedId").value();
      lastUsedId.menuItemId = menuItemIdCounter;
      router.db.set("lastUsedId", lastUsedId).write();
      response.json(newMenuItem);
    }
  
    server.get("/api/menuItems/:rest_id/:menu_id/:id?", (request, response) => {
      const restaurantId = parseInt(request.params.rest_id);
      const menuId = parseInt(request.params.menu_id);
      const menuItemId = request.params.id ? parseInt(request.params.id) : null; // Menu Item ID (if provided)
  
      const restaurantsData = router.db.get("restaurants").value();
      const restaurant = restaurantsData.find((restaurant) => restaurant.id === restaurantId);
  
      if (!restaurant) {
        response.status(404).json({ error: "Restaurant not found" });
      } else {
        const menu = restaurant.menu_list.find((menu) => menu.id === menuId);
  
        if (!menu) {
          response.status(404).json({ error: "Menu not found in the restaurant" });
        } else {
          if (menuItemId) {
            // Handle the case where 'id' is provided to fetch a specific menu item
            const menuItem = menu.items.find((item) => item.id === menuItemId);
  
            if (!menuItem) {
              response.status(404).json({ error: "Menu Item not found" });
            } else {
              response.json(menuItem);
            }
          } else {
            // Handle the case where 'id' is not provided to fetch all menu items for the menu
            response.json(menu.items);
          }
        }
      }
    });
  
    server.delete("/api/menuItems/:rest_id/:menu_id/:menu_item_id", (request, response) => {
      const restaurantId = parseInt(request.params.rest_id);
      const menuId = parseInt(request.params.menu_id);
      const menuItemId = parseInt(request.params.menu_item_id);
      const restaurantsData = router.db.get("restaurants").value();
      const restaurant = restaurantsData.find((restaurant) => restaurant.id === restaurantId);
  
      if (!restaurant) {
        response.status(404).json({ error: "Restaurant not found" });
      } else {
        const menu = restaurant.menu_list.find((menu) => menu.id === menuId);
  
        if (!menu) {
          response.status(404).json({ error: "Menu not found in the restaurant" });
        } else {
          const menuItemIndex = menu.items.findIndex((item) => item.id === menuItemId);
  
          if (menuItemIndex === -1) {
            response.status(404).json({ error: "Menu Item not found" });
          } else {
            menu.items.splice(menuItemIndex, 1);
            router.db.set("restaurants", restaurantsData).write();
            response.json({ message: "Menu Item deleted successfully" });
          }
        }
      }
    });
  };
  