import { createSlice, configureStore } from "@reduxjs/toolkit";
//로그인에 대한 정보를 추가할 건데 로그인 정보는 전역 데이터임, 즉, 애플리케이션에 있는 여러 컴포넌트와 관련이 있음
//로그인에 대한 정보를 추가하려면 store에 새로운 state를 추가해야 함

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: "counter", //slice의 이름
    initialState: initialCounterState, //slice에 들어갈 state(데이터들의) 초기값
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload; //payload로 접근해야 원하는 값을 얻을 수 있음(추가 데이터를 가지고 있는 프로퍼티의 이름이므로)
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    },
});

const initialAuthState = {
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        //리듀서 함수들 -> 두 메서들 모드 redux에서 자동으로 제공하는 현재 state를 인자로 받음
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    },
});

//주의해야 할점 -> slice가 여러개이더라도 redux store은 하나!! -> configureStore을 한번만 호출해야 함
//또한 store은 root reducer하나만 가지고 있어야 함
const store = configureStore({
    //counterSlice.reducer, authSlice.reducer같은 개별 reducer들은 자동으로 합쳐져서 거대한 reducer가 될 것
    reducer: {
        counter: counterSlice.reducer, //이 리듀서 맵에서 할당했던 식별자를 이용해서 다른 컴포넌트에서 특정 state slice에 접근 할 수 있음
        auth: authSlice.reducer,
    },
    // reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions; //액션생성자 -> 이미 type프로퍼티를 가지고 있음
export const authSliceActions = authSlice.actions;

export default store;
