import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Products/productAction";
import { addCartItem } from '../../Redux/Cart/cartSlice';
import { Link } from "react-router-dom";

import "./_products.scss";

const Products = () => {
  const dispatch = useDispatch();
  
  const { products = [], status, error } = useSelector(
    (state) => state.products
  );

  const cart=useSelector((state)=>state.cart);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  
 const addToCart = (itemData)=>{
        dispatch(addCartItem(itemData));
    }
  console.log("Cart State:", cart);


  if (status === "Loading...") return <p>Loading products...</p>;
  if (status === "Failed!") return <p>Error: {error}</p>;

  return (
    <div className="products-container">
      {products.length > 0 ? (
       products.map((product, index) => (
  <div className="mx-5 p-3 product-card" key={product.id}>
      <Link to="/productDetails"
      state={product}>

            <div className="product-image-container">
              {/* ✅ use PUBLIC url */}
             <img src={require(`../../assets/images/shop/${product.product_image}`)} alt={product.product_name} />
            </div>
            </Link>
            <div className="product-info">
              <h5>
               <Link to="/productDetails"
                state={product}>{product.product_name}</Link>
              </h5>
              <p className="product-price">${product.price}</p>
              <div className="product-rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
            </div>
            <div className='my-3' onClick={()=>addToCart(product)}>
              <div className="cart-button">
                <div className="cart-icon-container">
                   <i className="fa fa-shopping-cart mx-4" />
                </div>
                <div className="cart-text-container mx-3">
                   <p>Add to cart</p>
                </div>

              </div>
              </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Products;
