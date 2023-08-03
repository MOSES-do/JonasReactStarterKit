import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  //There is no prefix version for p-4
  const totalCartQuantity = useSelector((state)=> state.cart.cart.reduce((sum, item)=> sum + item.quantity, 0))
  const totalPrice = useSelector((state)=>state.cart.cart.map(item => item.unitPrice * item.quantity).reduce((acc, curValue) => {
    return acc + curValue
  }, 0));
 


  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4
    sm:px-6 text-sm md:text-base flex items-center flex-col 
    mane">
      <p className=" font-semibold text-stone-300 flex  items-center space-x-3">
        <span> {totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
