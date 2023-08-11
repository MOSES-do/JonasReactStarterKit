import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  //There is no prefix version for p-4

  //derived state
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null
 
  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4
    sm:px-6 text-sm md:text-base flex items-center flex-col 
    mane">
      <p className=" font-semibold text-stone-300 flex  items-center space-x-3">
        <span> {totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
