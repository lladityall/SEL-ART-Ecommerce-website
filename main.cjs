require("./style.css"); // This might need a bundler like Vite to work
const products = require('./api/products.json');
const { showProductContainer } = require("./homeProductCards.js");

showProductContainer(products);