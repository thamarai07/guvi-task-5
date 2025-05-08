import { useEffect, useState } from "react";
import { useContext } from "react";
import ProductContext from "../../Context/prodectContext";
import LocalStore from "../../Functions/localStroage";
const ProductModel = ({
  ProductDetails,
  CloseModel,
  Imageloaded,
  ImagesetLoaded,
}) => {
  const { image, category, title, price, description, rating } = ProductDetails;
  const [count, setcount] = useState(0);

  const { setAddedValue } = useContext(ProductContext);

  useEffect(() => {
    if (count === -1) {
      setcount(0);
    }
  }, [count]);

  const HandleAdd = (data) => {
    if (count === 0) {
      alert("Please add at least one quantity.");
      return;
    }

    if (data?.title !== undefined) {
      const getProduct = LocalStore("product", null, "GET");

      const alreadyExists =
        getProduct &&
        Object.entries(getProduct.item.name).some(
          ([_key, value]) => value.title === data.title
        );

      if (alreadyExists) {
        alert(data.title + " is already added in your cart");
      } else {
        setAddedValue((pre) => {
          const updatedItems = {
            ...pre?.item?.name,
            [data?.title]: {
              ...data,
              count: count,
            },
          };

          const updatedObject = {
            ...pre,
            item: {
              name: updatedItems,
            },
            totalCount: Object.keys(updatedItems).length,
          };

          LocalStore("product", updatedObject, "SET");

          return updatedObject;
        });
      }
    }

    CloseModel();
  };

  return (
    <>
      <div className="product_model_container" onClick={CloseModel}>
        <div className="product_model" onClick={(e) => e.stopPropagation()}>
          <div className="cart">
            <img
              src={image}
              alt={title}
              className={`product-image ${Imageloaded ? "loaded" : "loading"}`}
              onLoad={() => ImagesetLoaded(true)}
            />
            <div className="cart_details">
              <span className="category">#{category}</span>

              <p className="title"> Name : {title}</p>
              <p className="price">Price : {price}</p>
              <p className="description">
                <span
                  style={{
                    fontWeight: 700,
                  }}
                >
                  Description :{" "}
                </span>
                {description}
              </p>
              <p className="rating">
                {" "}
                <span>Ratings : {rating.rate} </span> - Count {rating.count}
              </p>
              <div className="count">
                <button
                  className="btn plus"
                  onClick={() => setcount(count + 1)}
                >
                  +
                </button>
                <span>{count}</span>
                <button
                  className="btn minus"
                  onClick={() => setcount(count - 1)}
                >
                  -
                </button>
              </div>
              <button
                className="add_btn"
                onClick={() => HandleAdd(ProductDetails)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModel;
