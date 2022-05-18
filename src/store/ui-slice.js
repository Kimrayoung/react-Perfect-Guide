//내 장바구니를 클릭함 -> 장바구니 영역을 토글
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { cartIsVisible: false, notification: null }, //장바구니를 표시해야하는지 아닌지를 판단하는 것
    //notification -> 초반에 null로 설정하여 처음에는 알림을 받지 않도록 함
    //알림을 받는 방법 -> APP컴포넌트에서 useState를 사용해서도 할 수 있었음 하지만 ui-slice에서 ui적인 요소를 관리하고 있으므로 여기서 처리하는게 로직상 더 맞음
    reducers: {
        //리듀서맵 -> 리듀서 키(해당 리듀서로 처리하고자 하는 모든 다양한 경우와 다양한 작업을 나타내는 맵
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible; //리덕스 툴킷은 이 코드를 캡쳐하고 제 3의 라이브러리인 Imer을 사용하여 새 상태의 개체를 생성함
        },
        showNotification(state, action) {
            //알림에 대한 정보를 관리하는 리듀서
            //알림의 종류는 페이로드로 작업에 인코딩이 되어야 함 -> 그리고 notificatioN에 대한 정보가 action에 담겨져 있을 것

            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
