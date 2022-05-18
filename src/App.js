import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actionSlice";

let isInitial = true; //이걸 사용하는 이융 : data가 펜딩상태라면 아직 장바구니 데이터를 가지고 오면 안되기 때문에
//초기에 한번만 로딩되도록  App()외부에서 정의
//이 파일이 처음으로 parse될때 초기화됨 -> 리렌더링 될때 초기화 되지는 않음

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart); //UseSelector 가 cart를 구독하고 있어서 항상 최신의 state가 유지될것
    //또한 cart의 state가 변경되면 useEffect가 자동으로 감지하여 Http 를 이용해서 통신을 하게 됬을 것
    const notification = useSelector((state) => state.ui.notification);

    //문제 -> 애플리케이션이 로드될때 디비에서 데이터를 가져오기만 해야하는데 데이터를 디비로 다시보냄
    //왜냐하면 기존의 cart가 fetchCartdata 함수의 로직으로 인해서 변경됬기때문에다시 dispatch가 일어나는 것
    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    //중요! useEffect는 앱이 마운트 될때 즉, 앱이 시작될 때 실행이 됨
    //문제인 이유: 초기 카트를 백엔드로 보내고 거기에 저장된 모든 데이터를 덮어쓰기 때문임
    useEffect(() => {
        //useEffect에 직접 async를 사용할 수는 없지만 useEffect 안의 데이터를 함수로 만들어서 그 함수에 async를 적용시킬 수는 있음
        // const sendCartData = async () => {};
        if (isInitial) {
            isInitial = false;
            return; //장바구니 데이터가 전송되는 것을 차단 -> 애플리케이션이 시작될 때만 차단
            // 추가한 데이터를 전송하게 되면 제대로 Notification이 작동됨
        }
        if (cart.changed) {
            dispatch(sendCartData(cart));
        }

        // sendCartData().catch((error) => {});
        //이렇게 하면 데이터베이스에 새 장바구니 노드가 생성되고 거기에 데이터가 저장이 됨
        //put을 사용하면 오버라이딩 기능을 이용하게 되는 것
    }, [cart, dispatch]); //리액트 리덕스는 dispatch함수는 절대로 변경되지 않는 함수임 을 보장함 -> 의존성 배열에 안전하게 추가할수있음
    //현재상태에 따라 다른 알림상태를 디스패치함
    return (
        <Fragment>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;
