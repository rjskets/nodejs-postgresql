require("dotenv").config();
const express = require("express");

const app = express();

// API to return user data
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" }
  ];
  res.json(users);
});

// API to return product data
app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "Laptop", price: 999.99 },
    { id: 2, name: "Smartphone", price: 599.99 },
    { id: 3, name: "Headphones", price: 149.99 }
  ];
  res.json(products);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
