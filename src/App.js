import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import "antd/dist/reset.css";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import { signInAction } from './actions/user';

import './App.css';
import { Grid, Skeleton, Stack } from '@mui/material';
import { handleGetData } from './utils/database';

function App() {
  const [user, setUser] = useState({});
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const dispatch = useDispatch();

  const handleGetUserData = async (uid) => {
    const userPath = `users/${uid}`;
    const snapshot = await handleGetData(userPath);
    const user = snapshot.val();
    if (user) {
      setUser(user);

      const signIn = signInAction(user.uid, user.role === 'admin' ? 'admin' : 'client');
      dispatch(signIn);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleGetUserData(user.uid).then(() => {
          setIsPageLoaded(true);
        });
      } else {
        setIsPageLoaded(true);
      }
    });

    return () => {};
  }, []);

  return isPageLoaded ? (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const Layout = route.layout ? route.layout : null;

          const element = Layout ? <Layout>{route.element}</Layout> : route.element;

          const isSignedIn = Object.keys(user).length > 0;

          return route.type === 'public' ||
            (route.type === 'private' && isSignedIn) ||
            (route.type === 'admin' && user.role === 'admin') ? (
            <Route key={`page-${index}`} path={route.path} element={element} />
          ) : (
            <Route key={`page-${index}`} path={route.path} element={<Navigate to="/sign-in" />} />
          );
        })}
      </Routes>
    </BrowserRouter>
  ) : (
    <div className="skeleton__wrapper">
      <Stack spacing={1}>
        <Skeleton variant="text" height={80} sx={{ fontSize: '1rem' }} />
        <Skeleton variant="rectangular" height={200} />
        <div className="skeleton__grid__wrapper">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          </Grid>
        </div>
        <Skeleton variant="text" height={80} sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" height={80} sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" height={80} sx={{ fontSize: '1rem' }} />
      </Stack>
    </div>
  );
}

export default App;
