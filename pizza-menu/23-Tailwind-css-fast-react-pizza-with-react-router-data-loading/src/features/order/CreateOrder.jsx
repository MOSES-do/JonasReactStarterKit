/*eslint-disable*/
import {useState} from 'react'
import { Form, redirect, useActionData } from 'react-router-dom'
import { createOrder } from "../../services/apiRestaurant";
import { useNavigation } from "react-router-dom"
import Button from '../../ui/Button'
import {  useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import  {fetchAddress}  from '../user/userSlice';
import store from '../../store'
import EmptyCart from '../cart/EmptyCart'
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const cart = useSelector(getCart);
  const [withPriority, setWithPriority] = useState(false);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
// console.log(cart)

const dispatch = useDispatch()

  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  // console.log(navigation.state)

  const {username, status:addressStatus, position, address, error:errorAddress} = useSelector(state => state.user)

  const isLoadingAddress = addressStatus  === 'loading'

  //useActionData is mostly used to return errors to be displayed in the U.I
  const formErrors = useActionData()

    if(!cart.length) return <EmptyCart/>

  return (
    <div className="h-full px-8 sm:px-16 flex flex-col justify-center">
      <h2 className="text-center text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      {/* <Form method='POST' action="/order/new"> */}
      <Form className="sm:max-w-[800px] w-full mx-auto my-0" method='POST'>
        <div className='mb-5 flex flex-col sm:items-center gap-2 sm:flex-row '>
          <label className="sm:basis-40">First Name:</label>
          <div className="grow">
            <input type="text" name="customer" defaultValue={username}  className="input w-full" />
          </div>
        </div>

        <div className='mb-5 flex flex-col sm:items-center gap-2 sm:flex-row '>
          <label className="sm:basis-40">Phone number:</label>
          <div className='grow'>
            <input type="tel" name="phone"  className="input w-full" />
            {formErrors?.phone && <p className='text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md'>{formErrors.phone}</p>}
          </div>
        </div>

        <div className='mb-5 flex flex-col sm:items-center relative gap-2 sm:flex-row '>
          <label className="sm:basis-40">Address:</label>
          <div className='grow'>
            <input type="text" name="address" defaultValue={address}   className="input w-full" disabled={isLoadingAddress} />
            {
              !position.lat && !position.lng &&
              <span className="absolute z-50 mt-[5px] right-[3px] geoBtn" >
                <Button disabled={isLoadingAddress} type="small" onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress())
                }}>Get Position</Button>
              </span>
            }
            {addressStatus === 'error' && <p className='text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md'>{errorAddress}</p>}
          </div>
        
        </div>

        <div className="flex items-center space-x-2">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
          value={withPriority}
          onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div className="mt-12">
          <input type="hidden" name='cart' value={JSON.stringify(cart)} />
          <input type='hidden' name='position' value={position.lng && position.lat ? `${position.lat},${position.lng}`: ''} />
          <Button type="primary" disabled={isSubmitting}>{isSubmitting || isLoadingAddress ? 'Placing order...' : `Order now from ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

//On Form submission, a request is created that will be intercepted by the action function
//It's possible by linking the form to the action function
export async function action({ request }) {

  const formData = await request.formData()
  // console.log(formData)
  //convert to object
  const data = Object.fromEntries(formData)
  // console.log(data)

  //transform data entries such as priorities to read boolean value
  const order = {
    ...data, cart: JSON.parse(data.cart),
    priority: data.priority === "true"
  }
  // console.log(order)

  const errors = {}
  if (!isValidPhone(order.phone)) errors.phone = 'Please enter a valid phone number'

  //catch errors
  if (Object.keys(errors).length > 0) return errors;

  //If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);
  // console.log(newOrder)

  //Clears cart on sent order
  store.dispatch(clearCart())
  //redirect on order creation
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
 //TC793E
 //00SLHL
 //1590ZK