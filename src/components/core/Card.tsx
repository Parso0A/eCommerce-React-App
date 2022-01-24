import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardImage from "./CardImage";
import moment from "moment";
import { Navigate } from "react-router";
import {
  addItem,
  updateItemInCart,
  removeItemFromCart,
} from "../../services/cart/cartService";
import { Product, ProductInCart } from "../../interfaces";

interface CardProps {
  product: Product | ProductInCart;
  showViewProductButton?: boolean;
  shouldViewAddToCart?: boolean;
  cartUpdate?: boolean;
  showRemoveProductButton?: boolean;
  onCartItemChangeCallback?: Function;
}

const Card = ({
  product,
  showViewProductButton = true,
  shouldViewAddToCart = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  onCartItemChangeCallback = () => {},
}: CardProps) => {
  const [redirect, setRedirect] = useState<boolean>(false);

  const [count, setCount] = useState<number>(
    (product as ProductInCart)?.count ?? 0
  );

  const viewProductButton = showViewProductButton && (
    <Link to={`/product/${product._id}`}>
      <button className="btn btn-outline-primary m-2">View Product</button>
    </Link>
  );

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };
  const shouldRedirect = (redirect: boolean) => {
    if (redirect) {
      return <Navigate to={"/cart"} />;
    }
  };

  const addToCartButton = shouldViewAddToCart ? (
    <button onClick={addToCart} className="btn btn-outline-warning m-2 ">
      Add to cart
    </button>
  ) : (
    ""
  );

  const showStock = (productQuantity) =>
    productQuantity > 0 ? (
      <span className="badge bg-primary rounded-pill">In Stock</span>
    ) : (
      <span className="badge bg-danger rounded-pill">Out of Stock</span>
    );

  const handleQuantityChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);

    if (event.target.value >= 1) {
      updateItemInCart(productId, event.target.value);
      onCartItemChangeCallback();
    }
  };

  const cartUpdateOptions = (cartUpdate: boolean) =>
    cartUpdate && (
      <div>
        <div className="input-group mb3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleQuantityChange(product._id)}
          />
        </div>
      </div>
    );

  const handleRemoveFromCart = () => {
    removeItemFromCart(product._id);
    onCartItemChangeCallback();
  };

  const removeProductButton = (showRemoveProductButton: boolean) =>
    showRemoveProductButton && (
      <button
        className="btn btn-outline-danger mt-2 mb-2"
        onClick={() => handleRemoveFromCart()}
      >
        Remove from Cart
      </button>
    );

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <CardImage item={product} url={"product"} />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on: {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        {viewProductButton}
        {addToCartButton}
        {removeProductButton(showRemoveProductButton)}
        {cartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
