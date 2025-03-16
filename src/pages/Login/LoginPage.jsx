import React, { useEffect } from 'react';
import { auth, googleProvider, signInWithPopup } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { addSSOUser } from '../../utils/firestore';
import { loaderKeys } from '../../constants/appConstants';
import { addLoaderService, removeLoaderService } from '../../utils/utils';

const LoginPage = () => {

  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => { });
    return () => unsubscribe();
  }, []);

  // Handle Google sign-in
  const handleSignIn = async () => {
    try {
      addLoaderService(loaderKeys.userLogin)
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await addSSOUser(user);
      removeLoaderService(loaderKeys.userLogin)
      navigate('/');  // Redirect to homepage after login
    } catch (error) {
      removeLoaderService(loaderKeys.userLogin)
      console.error(error);
    }
  };

  // Handle sign out


  return (
    <nav>
      <h2>My E-Commerce</h2>
      <div>
        <Button
          type="default"
          icon={<GoogleOutlined />}
          onClick={handleSignIn}
        >
          Sign in with Google
        </Button>
      </div>
    </nav>
  );
};

export default LoginPage;
