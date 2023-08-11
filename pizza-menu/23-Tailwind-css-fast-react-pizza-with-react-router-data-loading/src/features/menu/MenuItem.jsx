import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "../DeleteItem";
import { addItem, getCart } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CountPizza from "../UpdatePizzaQuantity";


/*eslint-disable*/
function MenuItem({ pizza }) {

  const dispatch = useDispatch()

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  //display "addToCart" or "delete" button returns a boolean value
  const cart = useSelector(getCart)
  const isInCart = cart.find(item => item.pizzaId === id)

  const handleAddToCart = () => {
    const newItem = { pizzaId: id, name, quantity: 1, unitPrice, totalPrice: unitPrice * 1 }
    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-2 max-w-[900px] my-0 mx-auto">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>


        <div className="mt-auto flex items-center justify-between ">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500 ">Sold out</p>}

          {isInCart && <CountPizza pizzaId={id} />}
          {isInCart ? <DeleteItem pizzaId={id} /> : <Button style={soldOut} disabled={soldOut} onClick={() => handleAddToCart()} type="small" centerAlign="self-center">Add to cart</Button>}
        </div>
      </div>

    </li>
  );
}

export default MenuItem;
