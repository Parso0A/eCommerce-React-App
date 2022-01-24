import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getProduct } from "../../services/product/productService";
import { useParams } from "react-router";
import { getRelatedProducts } from "../../services/product/productService";
import { Product as IProduct } from "../../global/models/product/product";

const Product = () => {
  const [product, setProduct] = useState<IProduct>();

  const [relatedProducts, setRelatedProducts] = useState<Array<IProduct>>([]);

  const [error, setError] = useState<string | null>(null);

  const loadSingleProduct = (productId: string) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);

        loadRelatedProducts(data._id);
      }
    });
  };

  const loadRelatedProducts = (productId) => {
    getRelatedProducts(productId).then((data) => {
      setRelatedProducts(data);
    });
  };

  const { productId } = useParams()!;

  useEffect(() => {
    loadSingleProduct(productId!);
  }, [productId]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className={"container-fluid"}
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProducts.map((item, idx) => (
            <div key={item._id} className="mb-3">
              <Card product={item} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
