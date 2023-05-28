import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';

import { signInAction } from './actions/user';

import './App.css';
import { Grid, Skeleton, Stack } from '@mui/material';

function App() {
  const [user, setUser] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let stateChanged;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        setIsPageLoaded(true);
        stateChanged = true;

        const signIn = signInAction(user.uid);
        dispatch(signIn);
      }
    });

    if (!stateChanged) {
      setIsPageLoaded(true);
    }

    return () => {};
  }, []);

  return isPageLoaded ? (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const Layout = route.layout ? route.layout : null;

          const element = Layout ? <Layout>{route.element}</Layout> : route.element;

          return route.type === 'public' || user ? (
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
