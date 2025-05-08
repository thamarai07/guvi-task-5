import { useState } from "react";
import FetchProduct from "../../Functions/fetch";
import ProductModel from "./ProdectModel";
const Main = () => {
  const [ProductDetails, setProductDetails] = useState();
  const [ProductDetailsModel, setProductDetailsModel] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [Data] = FetchProduct();

  const handleCart = (data) => {
    setProductDetailsModel(true);
    setProductDetails(data);
    document.body.classList.add("clicked");
  };

  const CloseModel = () => {
    setProductDetailsModel(false);
  };

  return (
    <>
      <div className="cart_container">
        {Data == undefined ? (
          <p className="loading">Loading</p>
        ) : (
          Data.map((item, index) => (
            <div className="cart" key={index} onClick={() => handleCart(item)}>
              <img
                src={item.image}
                alt={item.title}
                onLoad={() => setLoaded(true)}
                className={`product-image ${loaded ? "loaded" : "loading"}`}
              />
              <div className="cart_details">
                <span className="category">#{item.category}</span>

                <p className="title"> Name : {item.title && item.title}</p>
                <p className="price">Price : {item.price && item.price}</p>
                <p className="description">
                  <span
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    Description :{" "}
                  </span>
                  {item.description && item.description.substr(0, 60)}...{" "}
                </p>
                <p className="rating">
                  {" "}
                  <span>Ratings : {item.rating.rate} </span> - Count{" "}
                  {item.rating.count}
                </p>

                <button className="btn">Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
      {ProductDetailsModel && (
        <ProductModel
          ProductDetails={ProductDetails}
          CloseModel={CloseModel}
          Imageloaded={loaded}
          ImagesetLoaded={setLoaded}
        />
      )}
    </>
  );
};
export default Main;
