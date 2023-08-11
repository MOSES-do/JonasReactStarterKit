import { useDispatch, useSelector } from "react-redux";
import {  getCurrentQuantityById, increaseItemQuantity } from "./cart/cartSlice";
import { decreaseItemQuantity } from "./cart/cartSlice";
import Button from "../ui/Button";

/*eslint-disable*/
const UpdatePizzaQuantity = ({pizzaId}) => {

  /*
  It is not optimal to call redux state outside the slice when "deriving state" becos sometimes state structure or naming can change, if state is accessed in multiple places outside the store, it could lead to bugs as all the state outside the slice have to be renamed to match the state slice.
  Instead we derive state inside the slice and access it in our components

WRONG:      const quantity = useSelector(state=> state.cart.cart.find(item => item.pizzaId === pizzaId))?.quantity
RIGHT:      const currentQuantity = useSelector(getCurrentQuantityById(id))

  */
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))    
  const dispatch = useDispatch()

  return (
    <div>
        <Button type='others' onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button> 
      {currentQuantity}
        <Button type='others' onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button> 
    </div>
  )
}

export default UpdatePizzaQuantity