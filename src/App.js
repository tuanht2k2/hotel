import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const Layout = route.layout ? route.layout : null;

          const element = Layout ? <Layout>{route.e}</Layout> : route.element;

          return (
            <Route key={`page-${index}`} path={route.path} element={element} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
