import { Route, Routes } from "react-router-dom";
import MainComponent from "./MainComponent/MainComponent";
import ProductDetails from "./ProductDetails/ProductDetails";

const LandingPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default LandingPage;
