import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  //Whenever possible we should always derive the state. e.g. here we can add "totalPrice: 0 , numItems: 0" props along with cart: [] prop but we will drive them from cart: [] prop when needed. Bcz by adding the can create more problems by keeping them in sync with cart.
  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: "Mediterranean",
  //       quantity: 2,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      console.log(action.payload);
      //payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload = pizzaId _NOTE: Now, since here in Redux we are actually allowed to directly mutate the state, we could use the splice method to directly mutate the array. However author finds it a lot easier to still use the filter method like have been doing all along bcz actulla requires a lot less code.
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
//And then we need to give it a name getTotalCartPrice. So here we are using an arrow function because this is just a simple one liner. So again, this is now a Redux selector function. And the recommendation and the standard is that these functions start with the get keyword and that we have them all in the central place in the cart slice file because we will actually need this operation later on in another component. And so then all we will need to do is to take this function here and just reuse it.

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

//And by the way, having these selector functions (getTotalCartQuantity , getTotalCartPrice) here like this might actually cause performance issues in larger applications. And so if you are really serious about Redux, you can look into the "reselect" library which will allow us to optimize these selectors.
