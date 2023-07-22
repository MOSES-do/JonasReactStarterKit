


const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAT: ""
}



export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAT: action.payload.createdAT
      }

    case 'customer/updateName':
      return { ...state, fullName: action.payload }

    default:
      return state;
  }
}


//action creators customer

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAT: new Date().toISOString() }
  }
}



export function updateName(fullName) {
  return {
    type: 'account/updateName', payload: fullName
  }
}
