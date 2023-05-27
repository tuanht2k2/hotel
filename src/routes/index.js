import { Home, SignIn, SignUp, Bookings, Room, Image } from '../pages';
import { DefaultLayout } from '../layouts';

const routes = [
  { path: '/home', type: 'public', element: <Home />, layout: DefaultLayout },
  { path: '/', type: 'public', element: <Home />, layout: DefaultLayout },
  {
    path: '/bookings',
    type: 'private',
    element: <Bookings />,
    layout: DefaultLayout,
  },
  {
    path: '/rooms/:roomId',
    type: 'public',
    element: <Room />,
    layout: DefaultLayout,
  },
  { path: '/sign-in', type: 'public', element: <SignIn /> },
  { path: '/sign-up', type: 'public', element: <SignUp /> },
  { path: '/images/:imageId', type: 'public', element: <Image /> },
];

export default routes;
