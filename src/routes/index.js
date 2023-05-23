import { SignIn, SignUp } from '../pages';

const routes = [
  { path: '/signin', type: 'public', element: <SignIn /> },
  { path: '/signup', type: 'public', element: <SignUp /> },
];

export default routes;
