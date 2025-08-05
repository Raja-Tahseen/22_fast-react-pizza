import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
export default function AppLayout() {
  //In React Router we can get access to isLoading state by using the useNavigation hook. We will be able to see whether the app is currently idle, loading or submitting. And this info is actually for the entire app not just for one page but really for the entire router. So, it does not make sense to show loading indicator inside any component but it should be one generic loader here in this layout.
  const navigation = useNavigation();
  //console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}
