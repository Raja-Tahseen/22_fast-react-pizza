import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
// createBrowserRouter is a function where we define all routes by passing array of objects where each object is one route. Older way of using <BrowserRouter><Routes><Route> still work in modern browsers but "createBrowserRouter" included from Recat Rourer 6.4 allows to fetch/load data from server as well.(Also supports loaders, data actions or data fetchers)
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader, // STEP 2: Provide loader func to menu route.
        errorElement: <Error />, // Errors bubble up to parent route unless handled in route itself.
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
