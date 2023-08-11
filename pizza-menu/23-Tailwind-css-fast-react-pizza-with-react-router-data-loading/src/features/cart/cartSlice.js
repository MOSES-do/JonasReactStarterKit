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
                console.log(item.quantity)
                return (
                    item.pizzaId !== action.payload
                    
                    )
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

            //a way of using reducers inside of each other
            if(item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
        },

        clearCart(state){
            state.cart = []
        }

    }
})

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state) => state.cart.cart
//Derived states 
//Better to refactor derived state using the 'reselect'
export const getTotalCartQuantity = (state)=> state.cart.cart.reduce((sum, item)=> sum + item.quantity, 0)
export const getTotalCartPrice = (state) => state.cart.cart.map(item => item.totalPrice).reduce((acc, curValue) => {
    return acc + curValue
}, 0)
export const getCurrentQuantityById = id => state => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0
