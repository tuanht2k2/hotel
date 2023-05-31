import { Home, SignIn, SignUp, AdminLayout, Bookings, Room, Image, Booked } from '../pages';
import { DefaultLayout } from '../layouts';
import {
  AllOrders,
  AllRooms,
  AddRoom,
  Profile,
  Amenity,
} from '../pages/Admin/AdminLayout/Content';

const routes = [
  { path: '/', type: 'public', element: <Home />, layout: DefaultLayout },
  {
    path: '/bookings',
    type: 'public',
    element: <Bookings />,
    layout: DefaultLayout,
  },
  {
    path: '/rooms/:roomId',
    type: 'public',
    element: <Room />,
    layout: DefaultLayout,
  },
  { path: 'booked', type: 'private', element: <Booked />, layout: DefaultLayout },
  { path: '/sign-in', type: 'public', element: <SignIn /> },
  { path: '/sign-up', type: 'public', element: <SignUp /> },
  {
    path: '/admin',
    type: 'admin',
    element: <AllRooms />,
    layout: AdminLayout,
  },
  {
    path: '/admin/all-rooms',
    type: 'admin',
    element: <AllRooms />,
    layout: AdminLayout,
  },
  {
    path: '/admin/add-rooms',
    type: 'admin',
    element: <AddRoom />,
    layout: AdminLayout,
  },
  {
    path: '/admin/all-orders',
    type: 'admin',
    element: <AllOrders />,
    layout: AdminLayout,
  },
  {
    path: '/admin/amenity',
    type: 'admin',
    element: <Amenity />,
    layout: AdminLayout,
  },
  {
    path: '/admin/profile',
    type: 'admin',
    element: <Profile />,
    layout: AdminLayout,
  },
  { path: 'rooms/:roomId/images/:imageIndex', type: 'public', element: <Image /> },
];

export default routes;
