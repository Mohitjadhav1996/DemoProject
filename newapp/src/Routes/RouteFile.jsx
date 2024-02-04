import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../Component/UiComponent/Login";
import ProductList from "../Component/UiComponent/ProductList";
import SearchProduct from "../Component/UiComponent/SearchProduct";
import AddProduct from "../Component/UiComponent/AddProduct";
import EditProduct from "../Component/UiComponent/EditProduct";
import NotFound from "../Component/UiComponent/Notfound";


const RouteFile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("authtoken") !== "") {
      if(location.pathname==="/login"){
          navigate("/products")
      }else{
          navigate(location.pathname);

      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Routes>

        <Route path="/login" element={<LoginForm />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/search" element={<SearchProduct />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default RouteFile;
