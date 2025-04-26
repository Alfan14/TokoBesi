import './App.css';
import Header from './screen/Header/Header';
import Shop from './pages/shop/myShop';
import LoginForm from './screen/LoginForm/LoginForm';
import RegistrationForm from './screen/RegistrationForm/RegistrationForm';
import Home from './pages/Home/myHome';
import AlertComponent from "./screen/AlertComponent/AlertComponent";
import PrivateRoute from './utils/PrivateRoute';
import React, { useState, useEffect } from 'react';
import { setAuthToken } from "./utils/auth.utils";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route
} from "react-router-dom";
import ProductScreen from './screen/Product/ProductScreen';

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }
  return (
    <Router>
    <div className="App">
      <Header title={title} />
      <div className="container d-flex align-items-center flex-column">
        <Routes>
          <Route path="/" component={<RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />} />
          <Route path="/shop" element={<Shop showError={updateErrorMessage} updateTitle={updateTitle} />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/register" element={<RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />} />
          <Route path="/login" element={<LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Home/>}/>
                </Route>
        </Routes>
        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
      </div>
    </div>
  </Router>
);
}

export default App;