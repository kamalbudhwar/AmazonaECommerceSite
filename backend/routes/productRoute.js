import express from "express";
import Product from "../models/productModel.js";
import productSchema from "../models/productModel.js";
import {isAuth,isAdmin} from "../util.js"
var router = express.Router();

router.get("/", async (req, res) => {
  const productList = await Product.find({});
  if (productList) {
    res.send(productList);
  } else {
    res.status(401).send({ msg: "Error in loading product from the database" });
  }
});
router.get("/product/:id",async(req,res)=>{
    const productId=req.params.id;
    const product=await Product.findOne({_id:productId});
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({msg: "Product Not Found"});
    }
})
router.post("/",isAuth,isAdmin,async (req, res) => {
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

router.put("/:id",isAuth,isAdmin,async (req, res) => {
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

router.delete("/:id",isAuth,isAdmin, async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findById(productId);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({message:"Product Deleted"});
  } else {
    res.send("Error in deletion.")
  }
});

export default router;
