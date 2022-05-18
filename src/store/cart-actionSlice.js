import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

//firebase에 있던 데이터를 불러와서 이 프로젝트에서 사용하기 위해서는 data를 fetch해오는 이 fetchCartData를 프로젝트 어디선가 불러와야 함
export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await fetch(
                "https://high-redux-default-rtdb.firebaseio.com/cart.json"
            );

            if (!res.ok) {
                throw new Error("could not fetch cart data");
            }
            const data = await res.json();

            return data;
        }; //try catch를 fetchData를 실행시킴
        try {
            const cartData = await fetchData(); //여기서 fetch한 데이터를 state에 넣어줘야 함 -> cart-slice에 replace리듀서를 통해서 가능함
            //장바구니를 완전히 다 비우고 다시 새로고침을 해서 FetchCartData()를 수행하면 에러가 남
            //왜냐하면 현재 데이터를 넣는데 기준이 되는 항목키가 있어야 하는데 디비에 데이터가 없는데 데이터를 가져와서 넣으려고 하니까 오류가 나는것
            //즉, 디비의 장바구니 데이터가 비어있을 경우 디비에서 가져오는 데이터가 undefined인데 Undefined를 replaceCart에 보내주기 때문에 에러가 나는것
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            ); //replaceCart는 리듀서로 정의되어있고 이렇게 dispatch를 통해서 보내게 되면 알아서 reducer에서 알아서  action을 생성해서 넣어줌
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "fetching cart data failed",
                })
            );
        }
    };
};
//데이터를 fetch하기 전에 모든 부작용 논리를 컴포넌트에 넣는 대안 ->redux에서 자동으로 생성해주는 action thunk가 아니라
//개발자가 직접만든 action을 사용할 수 있음 -> 그걸 thunk라고 함
//작업 객체를 즉시 반환하지 않는 action creator을 만듬
//여기서는 아직 리듀서에 접근하지 않았기 때문에 다른 side effect나 비동기코드 실행이 가능함
export const sendCartData = (cart) => {
    //Cart state에 새로운 데이터를 보내면
    //notification을 통해서 pending중이라는 상태를 알림
    //이 함수는 다른 작업을 하지는 않고 바로 비동기 함수를 수행함
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data!",
            })
        );
        //그리고 데이터베이스에 데이터를 업데이터
        const senRequest = async () => {
            //api를 가져오기 위해서는 반드시 함수를 통해서 호출해야 함
            const res = await fetch(
                "https://high-redux-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT", //put을 사용해서 넣어주기 때문에 firebase에서는 그대로 가져와서 볂경하지 않고 저장함
                    body: JSON.stringify({
                        //changed는 firebase에 들어가면 안됨
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }), //현재 store에 저장이 되어있는 cart state를 보내줌
                }
            );
            if (!res.ok) {
                throw new Error("Sending cart data failed.");
            }
        };

        try {
            await senRequest();

            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Success Sending cart data!",
                })
            );
        } catch (error) {
            //try안에서 예외가 발생할 경우
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed",
                })
            );
        }
    };
};
