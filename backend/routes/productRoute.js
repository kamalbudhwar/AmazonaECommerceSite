import express from "express";
import Product from "../models/productModel.js";
import productSchema from "../models/productModel.js";
var router = express.Router();

router.get("/", async (req, res) => {
  const productList = await Product.find({});
  if (productList) {
    res.send(productList);
  } else {
    res.status(401).send({ msg: "Error in loading product from the database" });
  }
});
router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    rating: req.body.rating,
    description: req.body.description,
    numReviews: req.body.numReviews,
    countInStock: req.body.countInStock,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res.status(201).send({ msg: "New Product created", data: newProduct });
  }
  return res.status(500).send({ msg: "Error in creating Product" });
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId });
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.category = req.body.category;
    product.rating = req.body.rating;
    product.description = req.body.description;
    product.numReviews = req.body.numReviews;
    product.countInStock = req.body.countInStock;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res.status(201).send({ msg: "Updated", data: updatedProduct });
    }
    return res.status(500).send({ msg: "Error in updating the Product" });
  }
});

export default router;
