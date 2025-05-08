import { useContext, useEffect, useState } from "react";
import LocalStore from "../Functions/localStroage";
import ProductContext from "../Context/prodectContext";
const Navbar = () => {
  const { AddedValue } = useContext(ProductContext);
  const [ProductCount, setProductCount] = useState();
  const [Product, setProduct] = useState();
  const [ProductListModelShow, setProductListModelShow] = useState(false);

  useEffect(() => {
    const getProduct = LocalStore("product", null, "GET");
    setProductCount(getProduct);
    if (getProduct && getProduct.item !== null) {
      setProduct(getProduct.item ? getProduct.item : "");
    }
  }, [AddedValue]);

  const handleProductListModel = () => {
    setProductListModelShow((pre) => !pre);
  };

  const handleDelete = (title) => {
    if (Product && Product.name && Product.name[title]) {
      const updatedName = { ...Product.name };
      delete updatedName[title];

      const updatedObject = {
        item: {
          name: updatedName,
        },
        totalCount: Object.keys(updatedName).length,
      };

      LocalStore("product", updatedObject, "SET");
      setProduct(updatedObject.item);
      setProductCount(updatedObject);
    }
  };

  return (
    <>
      <nav>
        <ul className="nav_list">
          <li className="nav_item-1">Amazon Cart</li>
          <li className="nav_item-2">
            <button onClick={handleProductListModel}>Cart</button>
            {ProductCount != null && ProductCount.totalCount != null && (
              <span>{ProductCount.totalCount}</span>
            )}
          </li>
        </ul>
      </nav>
      {ProductListModelShow && (
        <div
          className="product_list_model"
          onClick={() => setProductListModelShow(false)}
        >
          <div className="product_list" onClick={(e) => e.stopPropagation()}>
            {Product &&
              Object.entries(Product.name).map(([key, prod]) => (
                <>
                  <div className="item">
                    <h5>{prod.title}</h5>
                    <img src={prod.image} alt={prod.title} />
                    <button
                      className=""
                      onClick={() => handleDelete(prod.title)}
                    >
                      Delete from Cart
                    </button>
                  </div>
                </>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
