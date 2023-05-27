import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';

import './App.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        console.log('user');
      }
    });

    return () => {};
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const Layout = route.layout ? route.layout : null;

          const element = Layout ? <Layout>{route.element}</Layout> : route.element;

          return route.type === 'public' || isSignedIn ? (
            <Route key={`page-${index}`} path={route.path} element={element} />
          ) : (
            <Route key={`page-${index}`} path={route.path} element={<Navigate to="/sign-in" />} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
