import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin, saveProduct, listProducts } from "../actions/productActions";

function ProductsScreen(props) {
  const [modelVisible, setModelVisible] = useState(false);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [numReview, setNumReview] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const productSave = useSelector((state) => state.productSave);
  const { loading: loadindSave, success: successSave, error: errorSave } = productSave;
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;

  useEffect(() => {
    if (successSave) setModelVisible(false);
    dispatch(listProducts);
  }, [successSave]);

  const openModal = (product) => {
    setModelVisible(true);
    setId(product._id);
    setName(product.name);
    setImage(product.image);
    setPrice(product.price);
    setBrand(product.brand);
    setCategory(product.category);
    setRating(product.rating);
    setDescription(product.description);
    setCountInStock(product.countInStock);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({ _id: id, name, price, image, brand, category, rating, description, numReview, countInStock }));
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button onClick={() => openModal({})}>Create Product</button>
      </div>
      {modelVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
              </li>
              {/* <li>
            <label htmlFor="rating">Rating</label>
            <input type="rating" name="rating" id="rating" onChange={(e) => setRating(e.target.value)}  ></input>
          </li>
          
          <li>
            <label htmlFor="numReview">Num Reviews</label>
            <input type="numReview" name="numReview" id="numReview" onChange={(e) => setNumReview(e.target.value)} ></input>
          </li> */}
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setModelVisible(false);
                  }}
                  className="button secondry"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button onClick={() => openModal(product)}>Edit</button>
                  <button onClick={() => openModal(product)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;
