
import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import { deleteItem } from "../features/cart/cartSlice";

/*eslint-disable*/

//This logic allows us to use the same delete btn functionality for the cart and menu features
function DeleteItem({pizzaId}) {

    const handleDeletePizza = () =>{
        dispatch(deleteItem(pizzaId))
    }

    const dispatch = useDispatch()
    return (
        <div>
            <Button onClick={() => handleDeletePizza()} type='small'>Delete</Button> 
        </div>
    )
}

export default DeleteItem
