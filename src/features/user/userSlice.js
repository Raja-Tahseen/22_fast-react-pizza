import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//As we can see, this is an async function which means that we cannot just call this function directly inside a Redux reducer because remember Redux is by nature completely synchronous, and so that's why we now need to talk about Thunks again. Basically all you need to know at this point is that a Thunk is a middleware that sits between the dispatching and the reducer itself. So it will do something to the dispatched action before actually updating the store.
//And so this createAsyncThunk receives two things. First, we need to pass in the action name and then second, we need to pass in an async function that will return the payload for the reducer later. So this function needs to return the promise and so an async function is ideal here. So let's just create an anonymous function here and then grab all this code and place that in there.

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    //1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    //2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    //3) Then we return an object with the data that we are interested in
    // Payload of the FULFILLED state
    return { position, address };
  }
);
//this fetchAddress here will actually become the action creator function (along with updateName() below) that we will later call in or code, and so let's export this one as well. And we should not call it something like getAddress because those names are reserved for selectors. So by convention, these names for the AsyncThunks should not be called something with get, okay?
//We used the Redux Toolkit way of creating a Thunk by calling a function with the action type name (needed internally by Redux but not used manually) and the actual Thunk function, which runs when the action is dispatched. The createAsyncThunk generates three extra action types: pending, fulfilled, and rejected. We handle these states separately in our reducers to connect the Thunk with them.

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
