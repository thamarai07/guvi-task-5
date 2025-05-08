import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Main from "./Components/Product/Main";
import ProductContext from "./Context/prodectContext";
function App() {
  const [AddedValue, setAddedValue] = useState();

  return (
    <div className="App">
      <ProductContext.Provider
        value={{ AddedValue, setAddedValue}}
      >
        <header>
          <Navbar />
        </header>
        <Main />
      </ProductContext.Provider>
    </div>
  );
}

export default App;
