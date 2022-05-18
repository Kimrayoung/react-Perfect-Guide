import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";

import { uiActions } from "../../store/ui-slice";

const CartButton = (props) => {
    //장바구니 버튼을 클릭하면 장바구니 영역이 보여져야 한다
    //구현방법 : 이 폴더에서 장바구니 폴더 버튼에 onClick 리스너 추가
    // 장바구니를 표시하거나 숨기기 위해 장바구니를 토글하는 논리를 dispatch -> 즉, toggle()을 통해서 장바구니가 눌렸는지 아닌지 확인

    //즉, cartIsVisible이라는 변수의 state를 알고 그 state가 true이면 state를 false로 변경하고 false이면 true로 변경하는 로직을 짜야 한다.
    //그러므로 cartIsVisible이라는 변수의 state를 가져오기 위해서 action객체를 가져와야 하고 -> uiAction을 import
    //cartIsVible에 대한 state변경을 위해서 dispatch함수를 사용해야 한다,

    const dispatch = useDispatch(); //useDispatch를 불러오면 리덕스에서 제공하는 dispatch함수를 useDispatch로 부터 리턴받앙서 사용할 수 있음
    const cartQuantity = useSelector((state) => state.cart.totalQuantity);
    const toggleCartHandler = () => {
        //uiSlice 리듀서 맵에서 toggle 메소드를 작동시켜서 cartIsVisble의 상태를 변경시켜야 함
        dispatch(uiActions.toggle()); //이렇게 하게 되면 자동으로 action객체가 생성되고 새롭게 만들어져서 해당 action이 새로운 객체로 저장됨
    };
    return (
        <button className={classes.button} onClick={toggleCartHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{cartQuantity}</span>
        </button>
    );
};

export default CartButton;
