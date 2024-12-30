import React from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../Components/MainNavigation';
import { useSelector } from 'react-redux';

function RootLayout() {
  const { role, accessToken } = useSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export default RootLayout;
