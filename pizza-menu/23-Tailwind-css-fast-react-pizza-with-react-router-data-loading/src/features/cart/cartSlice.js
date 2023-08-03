import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state, action) => {
            //payload = newItem
        if(action.payload.soldOut) return;
        if(state.cart.find(item => item.pizzaId === action.payload.pizzaId)) return
            state.cart.push(action.payload)           
            // console.log(action.payload)            
        },
        deleteItem:(state, action)=>{
            //payload = pizzaId
            state.cart = state.cart.filter(item => {
                console.log(item.pizzaId, action.payload)
                return item.pizzaId !== action.payload
            })
        },
        increaseItemQuantity:(state, action)=>{
             //payload = pizzaId
            const item = state.cart.find(item => item.pizzaId === action.payload);

            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity:(state, action)=>{
            //payload = pizzaId
            const item = state.cart.find(item => item.pizzaId === action.payload);

            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice
        },

        clearCart(state){
            state.cart = []
        }

    }
})

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions

export default cartSlice.reducer