import { Home, SignIn, SignUp, AdminLayout, Bookings, Room, Image } from "../pages";
import { DefaultLayout } from "../layouts";
import {
  AllOrders,
  AllRooms,
  AddRoom,
  ManageOrders,
} from "../pages/Admin/AdminLayout/Content";

const routes = [
  { path: "/home", type: "public", element: <Home />, layout: DefaultLayout },
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
  { path: "/sign-in", type: "public", element: <SignIn /> },
  { path: "/sign-up", type: "public", element: <SignUp /> },
  {
    path: "/admin/all-rooms",
    type: "public",
    element: <AllRooms />,
    layout: AdminLayout,
  },
  {
    path: "/admin/add-rooms",
    type: "public",
    element: <AddRoom />,
    layout: AdminLayout,
  },
  {
    path: "/admin/all-orders",
    type: "public",
    element: <AllOrders />,
    layout: AdminLayout,
  },
  {
    path: "/admin/manage-orders",
    type: "public",
    element: <ManageOrders />,
    layout: AdminLayout,
  },
  { path: '/images/:imageId', type: 'public', element: <Image /> },
];

export default routes;
