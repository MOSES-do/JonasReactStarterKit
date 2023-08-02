import { Link } from "react-router-dom";

function CartOverview() {
  //There i sno prefix version for p-4
  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4
    sm:px-6 text-sm md:text-base flex items-center flex-col 
    mane">
      <p className=" font-semibold text-stone-300 flex  items-center space-x-3">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
