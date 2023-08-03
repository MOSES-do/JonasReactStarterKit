import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearCart } from './cartSlice';
/*eslint-disable*/

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  // const cart = fakeCart;
  const cart = useSelector(state=>state.cart.cart)
  const username = useSelector(state=>state.user.username)
  
  const dispatch = useDispatch()

  return (
    <div className="py-3 px-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

    <ul className="divide-y divide-stone-200 border-b mt-3">

      
      <>
      {cart.length === 0 && <p>Add items to cart from menu</p>}
          {cart.length > 0 && cart.map(item=><CartItem item={item} key={item.pizzaId}/>)}
      </>
      
    </ul>


      <div className='mt-6 space-x-2'>
        <Button to="/order/new" type="primary">&larr; Order pizzas</Button>
        <Button onClick={()=>dispatch(clearCart())} type='secondary'>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
