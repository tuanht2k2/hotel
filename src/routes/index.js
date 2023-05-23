import { Home, SignIn, SignUp } from '../pages';

const routes = [
  { path: '/home', type: 'public', element: <Home /> },
  { path: '/signin', type: 'public', element: <SignIn /> },
  { path: '/signup', type: 'public', element: <SignUp /> },
];

export default routes;
