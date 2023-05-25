import { Home, SignIn, SignUp, Bookings, Room, Image } from '../pages';
import { DefaultLayout } from '../layouts';

const routes = [
  { path: '/home', type: 'public', element: <Home />, layout: DefaultLayout },
  {
    path: '/bookings',
    type: 'public',
    element: <Bookings />,
    layout: DefaultLayout,
  },
  {
    path: '/room/:roomId',
    type: 'public',
    element: <Room />,
    layout: DefaultLayout,
  },
  { path: '/signin', type: 'public', element: <SignIn /> },
  { path: '/signup', type: 'public', element: <SignUp /> },
  { path: '/images/:imageId', type: 'public', element: <Image /> },
];

export default routes;
