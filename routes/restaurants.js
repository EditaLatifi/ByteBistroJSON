module.exports = function (server) {
  // Import necessary functions and data
  const { readLastUsedRestaurantId } = require("../utils"); // Update to match your utility function for restaurant IDs
  let restaurantIdCounter = readLastUsedRestaurantId();
  const jsonServer = require("json-server");
  const router = jsonServer.router("db.json");

  server.post("/api/restaurants", (request, response) => {
    const requestBody = request.body;
    // Generate a new unique and auto-incrementing ID
    if (requestBody.id === undefined) {
      let restaurantId;
      restaurantId = restaurantIdCounter++;
      // Create a new restaurant object with the name and auto-incremented ID
      const newRestaurant = {
        id: restaurantId,
        name: requestBody.name,
        address: requestBody.address,
        menus: []
      };
      const restaurantsData = router.db.get("restaurants").value();
      restaurantsData.push(newRestaurant);
      router.db.set("restaurants", restaurantsData).write();
      // Update the last used ID and write it to the JSON file
      const lastUsedId = router.db.get("lastUsedId").value();
      lastUsedId.restaurantId = restaurantIdCounter;
      router.db.set("lastUsedId", lastUsedId).write();
      response.json(newRestaurant);
    } else {
      const restaurantsData = router.db.get("restaurants").value();
      const index = restaurantsData.findIndex(
        (restaurant) => restaurant.id === parseInt(requestBody.id)
      );
      if (index === -1) {
        response.status(404).json({ error: "Restaurant not found" });
      } else {
        // Update the restaurant with the new data
        requestBody.id = parseInt(requestBody.id);
        restaurantsData[index] = {
          ...restaurantsData[index],
          ...requestBody,
        };
        router.db.set("restaurants", restaurantsData).write();
        response.json(restaurantsData[index]);
      }
    }
  });

  server.delete("/api/restaurants/delete/:id", (request, response) => {
    const restaurantId = parseInt(request.params.id);
    const restaurantsData = router.db.get("restaurants").value();
    const updatedRestaurants = restaurantsData.filter(
      (restaurant) => restaurant.id !== restaurantId
    );
    router.db.set("restaurants", updatedRestaurants).write();
    response.json({ message: "Restaurant deleted successfully" });
  });

  server.get("/api/restaurants/all", (request, response) => {
    const restaurantsData = router.db.get("restaurants").value();
    response.json(restaurantsData);
  });

  server.get("/api/restaurants/id/:id", (request, response) => {
    const restaurantId = parseInt(request.params.id);
    const restaurantsData = router.db.get("restaurants").value();
    const restaurant = restaurantsData.find(
      (restaurant) => restaurant.id === restaurantId
    );
    if (!restaurant) {
      response.status(404).json({ error: "Restaurant not found" });
    } else {
      response.json(restaurant);
    }
  });
};
