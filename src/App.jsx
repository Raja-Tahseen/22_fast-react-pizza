import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
// createBrowserRouter is a function where we define all routes by passing array of objects where each object is one route. Older way of using <BrowserRouter><Routes><Route> still work in modern browsers but "createBrowserRouter" included from Recat Rourer 6.4 allows to fetch/load data from server as well.(Also supports loaders, data actions or data fetchers)
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
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
]);
export default function App() {
  return <RouterProvider router={router} />;
}
