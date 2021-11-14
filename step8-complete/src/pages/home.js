import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const BuyNowButton = ({ product }) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  const buy = () => {};

  if (isLoading) return <></>;

  if (isAuthenticated) return <button onClick={buy}>Buy Now</button>;

  return <button onClick={loginWithRedirect}>Log In To Purchase</button>;
};

const Home = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch("/.netlify/functions/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  }, [setProducts]);

  return (
    <>
      <h1>Home</h1>
      <p>Welcome to my web store!</p>
      <div className="products">
        {products &&
          products.map((product) => {
            return (
              <div className="product" key={product.id}>
                <h2>{product.name}</h2>
                <p className="img">
                  <img src={product.images[0]} alt={product.name} />
                </p>
                <p className="sku">SKU: {product.id}</p>
                <p className="description">{product.description}</p>
                <p className="price">${(product.prices[0].unit_amount / 100).toFixed(2)}</p>
                <p className="buynow">
                  <BuyNowButton product={product} />
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
