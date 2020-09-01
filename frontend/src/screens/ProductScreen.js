import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
function ProductScreen(props) {
  const [qty,setQty]=useState(1);
  const productDetail=useSelector(state => state.productDetail);
  const{product,loading,error}=productDetail;
  const dispatch=useDispatch();
  useEffect(()=>{ 
      dispatch(detailsProduct(props.match.params.id));
      
  },[]);
  
  const handleAddToCart=()=>{
    props.history.push("/cart/"+props.match.params.id+"?qty="+qty);
  }

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading?<div>Loading......</div>:
      error?<div>{error}</div>:
        (<div className="details">
        <div className="details-image">
          <img src={product.image} alt="product" />
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>{product.rating}</li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <b>${product.price}</b>
            </li>
            <li>
                Description:
                <div>
                    {product.description}
                </div>
            </li>
          </ul>
        </div>
        <div className="details-action">
            <ul>
                <li>Price: ${product.price}</li>
                <li>Status:{product.countInStock>0?"In Stock":"Out ofStock"} </li>
                <li>Qty: <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                    {[...Array(product.countInStock).keys()].map((x,index)=>(<option key={index}value={x+1}>{x+1}</option>))}
                    </select> </li>
                <li>{product.countInStock>0&&(<button className="button primary" onClick={handleAddToCart}>Add to Cart</button>)}</li>
            </ul>
        </div>
      </div>)
      }
    </div>
  );
}
export default ProductScreen;
