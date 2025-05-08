import { useState, useEffect } from "react";
 function FetchProduct() {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log("Fetching Data Error ",error);
      }
    };
    fetchdata();
  }, []);
  return [Data];
}

export default FetchProduct;







