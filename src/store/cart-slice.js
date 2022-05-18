import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false, //항목에 데이터를 추가하거나 장바구니에서 제거하는 경우
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        //action들을 수행
        //action에는 리듀서가 수행해야 할 작업이 담겨 있음
        addItemToCart(state, action) {
            //action객체를 자동을 생성함
            //action이 필요함 왜냐하면 dispatch할때 사용해야 하기 때문
            //state -> 현재 데이터, action -> 새로운 데이터 + 리듀서가 할일
            const newItem = action.payload; //새롭게 추가되는 아이템 객체를 의미힘 -> items배열에 추가할 새로운 데이터를 변수로 생성
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            ); //action으로 받아온 데이터가 존재하는지 확인
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            //장바구니에서 항목을 제거하면 상태와 작업이 표시됨
            const id = action.payload; //삭제할 데이터의 아이디
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice =
                    existingItem.totalPrice - existingItem.price;
            }
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
