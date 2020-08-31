import React,{useEffect} from 'react';
import {listProducts} from '../actions/productActions'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
function HomeScreen(props) {
    const productList=useSelector(state=>state.productList);
    const{products,loading,error}=productList;
    const dispatch=useDispatch();
    useEffect(() => {
         dispatch(listProducts());

    }, [])
  return (
      loading?<div>Loding.........</div>:
      error?<div>{error}</div>:
      <ul className="products">
        {products.map((product,key) => (
          <li key={key}>
            <div className="product">
            <Link to={"/product/"+product._id}><img className="product-image" src={product.image} alt=""/></Link>
              <div className="product-name">
                <Link to={"/product/"+product._id}>{product.name}</Link>
              </div>
              <div className="product-barnd">{product.brand}</div>
              <div className="product-price">{product.price}</div>
              <div className="product-ratings">
                {product.Stars} Stars ({product.numReviews} Reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
  );
}
export default HomeScreen;
