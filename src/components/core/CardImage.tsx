import React from "react";
import { API } from "../../config";
import { Product } from "../../global/models/product/product";

interface CardImageProps {
  item: Product;
  url: string;
}

const CardImage = ({ item, url }: CardImageProps) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
    />
  </div>
);

export default CardImage;
