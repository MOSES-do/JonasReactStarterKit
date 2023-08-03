import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { increaseItemQuantity } from "./cartSlice";
import { decreaseItemQuantity } from "./cartSlice";
import { deleteItem } from "./cartSlice";
/*eslint-disable*/ 

function CartItem({ item }) {
  // console.log(item)
  const { pizzaId, name, quantity , totalPrice } = item;

  const dispatch = useDispatch()

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0 flex">
        <button className="mr-2 font-bold" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</button> 
        {quantity} 
        <button className="ml-2 mr-8 font-bold" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>- </button> 
       &times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button  onClick={()=> dispatch(deleteItem(pizzaId))} type='small'>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
