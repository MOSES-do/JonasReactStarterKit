import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAddress } from '../../services/apiGeocoding'

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//Action creator function using redux/toolkit
//This createAsyncThunk gives us access to 3 additional action types
//1. Pending promise state
//2. Fulfilled promise state
//3. Rejected state

//AsyncThunk also gives access to the use of extraReducers

export const fetchAddress = createAsyncThunk('user/fetchAddress', async function () {

  const positionObj = await getPosition();  // 1) We get the user's geolocation position

  const position = {
    lat: positionObj.coords.latitude,
    lng: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  console.log(addressObj)
  //Payload of the FULFILLED state
  const address = `${addressObj?.address_line2}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.country}`;

  // 3) Then we return an object with the data that we are interested in
  //Payload of the FULFILLED state
  return { position, address };
})

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle'
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message
        // state.error = 'ffjfjfjfjf'
      })

})

export const { updateName } = userSlice.actions

export default userSlice.reducer;

export const getUserName = (state) => state.user.username