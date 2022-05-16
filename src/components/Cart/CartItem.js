import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
    const dispatch = useDispatch(); //action객체를 리듀서에게 전달하는 함수
    const { title, quantity, total, price, id } = props.item;

    const removeItemHandler = () => {
        dispatch(cartActions.removeItemFromCart(id));
    };

    const addItemHandler = () => {
        dispatch(
            cartActions.addItemToCart({
                id,
                title,
                price,
            })
        );
    };

    return (
        <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${total.toFixed(2)}{" "}
                    <span className={classes.itemprice}>
                        (${price.toFixed(2)}/item)
                    </span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={addItemHandler}>+</button>
                    <button onClick={removeItemHandler}>-</button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
