import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  fullName: "",
  nationalID: "",
  createdAT: ""
}

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {

    createCustomer: {
      prepare(fullName, nationalID, createdAT) {
        return {
          payload: { fullName, nationalID, createdAT }
        }
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName
        state.nationalID = action.payload.nationalID
        state.createdAT = action.payload.createdAT
      }
    },


    updateName(state, action) {
      state.fullName = action.payload.fullName
    }
  }
})


export const { updateName } = customerSlice.actions


//action creators customer

export function createCustomer(fullName, nationalID) {
  return async function (dispatch, getState) {
    await dispatch(
      {
        type: "customer/createCustomer",
        payload: { fullName, nationalID, createdAT: new Date().toISOString() }
      }
    )
    console.log(getState())
  }
}


export default customerSlice.reducer
