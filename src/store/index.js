//추가할 슬라이스의 종류
// 장바구니 관리용 슬라이스, 장바구니 토글링(사용자 인터페이스 로직용) -> 각각 개별적으로 슬라이스 필요
//반드시 두개의 슬라이스로 나눠야 하는 것은 아니지만 두개의 슬라이스로 나눠좋으면 코드가 유지 관리가 쉬워짐
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
    //이걸 설정해주면 스토어를 제공되고 root reducer가 여기 들어옴
    //ui가 ui state의 키에 해당
    reducer: {
        ui: uiSlice.reducer,
        cart: cartSlice.reducer,
    },
});

export default store;
