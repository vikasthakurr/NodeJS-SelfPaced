const validateMenuItem = (req, res, next) => {
  const { name, price, category, foodType } = req.body;

  const errors = [];
  if (!name || name.trim().length < 2) {
    errors.push({
      field: "name",
      message: "Name is required and should be at least 2 characters long",
    });
  }

  if (!price || price <= 0) {
    errors.push({
      field: "price",
      message: "Price is required and should be a positive number",
    });
  }
  const validFoodType = [
    "starter",
    "main course",
    "dessert",
    "beverage",
    "snack",
    "appetizer",
    "thali",
  ];

  if (!category || !validFoodType.includes(foodType)) {
    errors.push({
      field: "foodType",
      message:
        "Invalid food type. Please choose from: starter, main course, dessert, beverage, snack, appetizer, thali",
    });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
export default validateMenuItem;
