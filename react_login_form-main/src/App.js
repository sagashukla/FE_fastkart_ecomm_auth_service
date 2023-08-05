import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import SellerHome from './SellerHome';
import AddProduct from './AddProductComponent';
import ProductDetailPage from './ProductDetailPage';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/seller-home" element={<SellerHome/>}></Route>
          <Route path="/add-product" element={<AddProduct></AddProduct>}></Route>
          <Route path="/product-pdp" element={<ProductDetailPage></ProductDetailPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;