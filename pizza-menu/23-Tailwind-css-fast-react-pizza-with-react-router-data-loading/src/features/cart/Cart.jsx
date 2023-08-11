import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import { getUserName } from '../user/userSlice';
import EmptyCart from './EmptyCart'
/*eslint-disable*/

function Cart() {
  // const cart = fakeCart;
  const cart = useSelector(getCart)
  const username = useSelector(getUserName)

  if(!cart.length) return <EmptyCart/>
  
  const dispatch = useDispatch()

  return (
    <div className="py-3 px-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

    <ul className="divide-y divide-stone-200 border-b mt-3">
      {cart.map(item=><CartItem item={item} key={item.pizzaId}/>)}
    </ul>


      <div className='mt-6 space-x-2'>
        <Button to="/order/new" type="primary">&larr; Order pizzas</Button>
        <Button onClick={()=>dispatch(clearCart())} type='secondary'>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
