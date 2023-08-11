import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "../DeleteItem";
import UpDatePizza from "../UpdatePizzaQuantity";
/*eslint-disable*/ 

function CartItem({ item }) {
  // console.log(item)
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <div className="mb-1 sm:mb-0 flex">
       {quantity} &times; {name}
      </div>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpDatePizza pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
