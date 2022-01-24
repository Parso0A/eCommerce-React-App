import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import { getCartItems } from "../../services/cart/cartService";
import { ProductInCart } from "../../interfaces";

const Cart = () => {
  const [items, setItems] = useState<Array<ProductInCart>>([]);

  const reloadItems = () => {
    setItems(getCartItems());
  };

  useEffect(() => {
    reloadItems();
  }, []);

  const showCartItems = (items: Array<ProductInCart>) => (
    <div>
      <h2>Your Cart Has {`${items.length}`} Item(s)</h2>
      <hr />
      <div className="row">
        {items.map((item, idx) => (
          <div key={item._id} className="col-4">
            <Card
              shouldViewAddToCart={false}
              key={item._id}
              product={item}
              cartUpdate={true}
              showRemoveProductButton={true}
              onCartItemChangeCallback={() => reloadItems()}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const noItemsMessage = (
    <h2>
      Your Cart is Empty. <br /> <Link to="/shop">Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage Your Cart Items"
      className={"container-fluid"}
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showCartItems(items) : noItemsMessage}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your Cart Summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
