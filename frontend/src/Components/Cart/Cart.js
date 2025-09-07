import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import FilledCart from "./FilledCart";


const Cart = ()=>{
    const cart = useSelector(state => state.cart);

    return(
        <div>
            {
                cart.cartItems.length===0 ?
                    <EmptyCart/>
                :
                    <FilledCart/>
            }
        </div> 
    )
}

export default Cart;