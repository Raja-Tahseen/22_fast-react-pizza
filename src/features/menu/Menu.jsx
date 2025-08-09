import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // STEP 3: Get data into the component. For which we can use a custom hook "useLoaderData", in which we don't need to pass any param bcz React Router will ofcourse automatically know that the data we want here is the one that is associated with this page (menu).
  //And effectively what we just did here was to implement or to use a render as you fetch strategy because the nice thing about this is that React Router will actually start fetching the data at the same time as it starts rendering the correct route. So these things really happen at the same time, while what we did before using useEffect was always a fetch on render approach. So basically, we rendered the component first, and then after the component was already rendered is when we then would start to fetch the data. And so that would then create so-called data loading waterfalls, but not here.

  const menu = useLoaderData();
  //console.log(menu);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// STEP 1: Load data into an async function & export to made it available in "createBrowserRouter" Menu route element. (By convention name this func "loader" and also should be placed in the same file that needs data)
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
