/*eslint-disable*/
import { useState } from "react";
import { Form, redirect, useActionData } from 'react-router-dom'
import { createOrder } from "../../services/apiRestaurant";
import { useNavigation } from "react-router-dom"


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];


function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  //useActionData is mostly used to return errors to be displayed in the U.I
  const formErrors = useActionData()

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <Form method='POST' action="/order/new"> */}
      <Form method='POST'>
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
            {formErrors?.phone && <p style={{ color: "red", marginTop: "-2px" }}>{formErrors.phone}</p>}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name='cart' value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>{isSubmitting ? 'Placing order...' : 'Order now'}</button>
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
    priority: data.priority === "on"
  }
  // console.log(order)

  const errors = {}
  if (!isValidPhone(order.phone)) errors.phone = 'Please enter a valid phone number'

  if (Object.keys(errors).length > 0) return errors;

  //If evefrything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  //redirect on order creation
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
 //TC793E
 //00SLHL
 //1590ZK