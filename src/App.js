import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import "antd/dist/reset.css";
import "./App.css";
import { useState } from "react";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const Layout = route.layout ? route.layout : null;

          const element = Layout ? (
            <Layout>{route.element}</Layout>
          ) : (
            route.element
          );

          return route.type === "public" || isSignedIn ? (
            <Route key={`page-${index}`} path={route.path} element={element} />
          ) : (
            <Route
              key={`page-${index}`}
              path={route.path}
              element={<Navigate to="/signin" />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
