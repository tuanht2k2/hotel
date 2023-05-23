import { Home, SignIn, SignUp } from '../pages';
import { DefaultLayout } from '../layouts';

const routes = [
  { path: '/home', type: 'public', element: <Home />, layout: DefaultLayout },
  { path: '/signin', type: 'public', element: <SignIn /> },
  { path: '/signup', type: 'public', element: <SignUp /> },
];

export default routes;
