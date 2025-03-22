// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/Login/LoginPage';
import { login, logout, setFireStoreUser } from './redux/authSlice';
import AddProductPage from './pages/Product/AddProductPage';
import Shop from './pages/Shop/Shop';
import { getFsUserData } from './utils/firestore';
import { addLoaderService, removeLoaderService } from './utils/utils';
import { loaderKeys } from './constants/appConstants';
import AdminGuard from './pages/Login/AdminGuard';
import StockPage from './pages/Stock/StockPage';
import StockRegister from './pages/Register/StockRegister/StockRegister';
import Loader from './components/Common/Loader/Loader';
import CartIcon from './components/Cart/CartIcon';
import CartPage from './pages/Shop/CartPage/CartPage';
import AlertContainer from './components/Common/Notification/AlertContainer';
import PageNotAccess from './components/Common/PageNotAccess/PageNotAccess';

function App() {


  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { loaders } = useSelector((state) => state.system);

  // Listen for changes in the authentication state (sign in / sign out)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        addLoaderService(loaderKeys.updateUser)
        const res = await getFsUserData(user);
        dispatch(setFireStoreUser(res));
        removeLoaderService(loaderKeys.updateUser)
        // Dispatch login action if the user is logged in
        dispatch(login(user));
      } else {
        // Dispatch logout action if the user is logged out
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // Open a notification when the component mounts

  return (
    <>
      <AlertContainer />
      {loaders.length >= 1 && <Loader />}
      {
        !isAuthenticated ? (<Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>) : (
          <Router>
            <CartIcon />
            <Navbar />
            <Routes>
              <Route path="/no-access" element={<PageNotAccess />} />
              <Route path="/" element={<AdminGuard user={user}><HomePage /></AdminGuard>} />
              <Route path="/category/:id" element={<AdminGuard user={user}><CategoryPage /></AdminGuard>} />
              <Route path="/shop" element={<AdminGuard user={user}><Shop /></AdminGuard>} />
              <Route path="/product/:id" element={<AdminGuard user={user}><ProductPage /></AdminGuard>} />
              <Route path="/stock-maintain/:productName" element={<AdminGuard user={user}><StockPage /></AdminGuard>} />
              <Route path="/stock-buy-register" element={<AdminGuard user={user}><StockRegister /></AdminGuard>} />
              <Route path="/cart" element={<AdminGuard user={user}><CartPage /></AdminGuard>} />
              <Route
                path="/product/add"
                element={<AdminGuard user={user}><AddProductPage /></AdminGuard>}
              />
              <Route path="/login" element={user ? <AdminGuard user={user}><Navigate to="/" /></AdminGuard> : <LoginPage />} />
            </Routes>
          </Router>
        )
      }
    </>

  );
}

export default App;
