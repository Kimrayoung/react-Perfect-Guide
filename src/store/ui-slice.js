//내 장바구니를 클릭함 -> 장바구니 영역을 토글
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { cartIsVisible: false }, //장바구니를 표시해야하는지 아닌지를 판단하는 것
    reducers: {
        //리듀서맵 -> 리듀서 키(해당 리듀서로 처리하고자 하는 모든 다양한 경우와 다양한 작업을 나타내는 맵
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible; //리덕스 툴킷은 이 코드를 캡쳐하고 제 3의 라이브러리인 Imer을 사용하여 새 상태의 개체를 생성함
        },
    },
});

export const uiAction = uiSlice.actions;
export default uiSlice;
