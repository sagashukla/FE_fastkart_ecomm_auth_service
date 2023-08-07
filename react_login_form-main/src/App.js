import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import SellerHome from './SellerHome';
import AddProduct from './AddProductComponent';
import ProductDetailPageSeller from './ProductDetailPageSeller';
import ProductDetailPageBuyer from './ProductDetailPageBuyer';
import ProductComponentWithoutPdpCta from './ProductComponentWithoutPdpCta';
import BuyerHome from './BuyerHome';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/seller-home" element={<SellerHome/>}></Route>
          <Route path="/add-product" element={<AddProduct></AddProduct>}></Route>
          <Route path="/product-pdp-seller" element={<ProductDetailPageSeller></ProductDetailPageSeller>}></Route>
          <Route path="/product-pdp-buyer" element={<ProductDetailPageBuyer></ProductDetailPageBuyer>}></Route>
          <Route path="/buyer-home" element={<BuyerHome></BuyerHome>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;