const jsonServer = require("json-server");
const router = jsonServer.router("db.json");

function readLastUsedRestaurantId() {
  const data = router.db.get("lastUsedId").value();
  return data.restaurantId;
}

// Function to write the last used Restaurant ID to a JSON file
function writeLastUsedRestaurantId(value) {
  const lastUsedId = router.db.get("lastUsedId").value();
  lastUsedId.restaurantId = value;
  router.db.set("lastUsedId", lastUsedId).write();
}

// Function to read the last used Menu ID from a JSON file
function readLastUsedMenuId() {
  const data = router.db.get("lastUsedId").value();
  return data.menuId;
}

// Function to write the last used Menu ID to a JSON file
function writeLastUsedMenuId(value) {
  const lastUsedId = router.db.get("lastUsedId").value();
  lastUsedId.menuId = value;
  router.db.set("lastUsedId", lastUsedId).write();
}

// Function to read the last used Menu Item ID from a JSON file
function readLastUsedMenuItemId() {
  const data = router.db.get("lastUsedId").value();
  return data.menuItemId;
}

// Function to write the last used Menu Item ID to a JSON file
function writeLastUsedMenuItemId(value) {
  const lastUsedId = router.db.get("lastUsedId").value();
  lastUsedId.menuItemId = value;
  router.db.set("lastUsedId", lastUsedId).write();
}

module.exports = {
  readLastUsedRestaurantId,
  writeLastUsedRestaurantId,
  readLastUsedMenuId,
  writeLastUsedMenuId,
  readLastUsedMenuItemId,
  writeLastUsedMenuItemId,
};
