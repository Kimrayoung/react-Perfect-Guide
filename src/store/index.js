//createReducer도 있지만 createSlice함수가 더 강력함
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice(
    //createSlice는 객체를 인자로서 생성함 creatSlice를 기자고 '전역 상태의 slice'를 미리 만들어놔야 함
    //slice는 여러개가 존재할 수 있음 , 또한 slice는 관련있는 데이터들을 가지고 있을 수 있다
    //현재 프로젝트에서는 counter에 관련된 state만 있으므로 slice가 하나만 있으면 된다.
    //또한 모든 slice에는 이름이 필요하다 -> state마다 식별자가 필요한것

    //createSlice는 서로 다른 reducer에 해당하는 고유 액션 식별자를 자동으로 생성함 ->action 식별자 값을 얻는 방법 : counterSlice.actions
    //counterSlice.actions -> key들로 가득함(ex. increment, decrement, increase 등)
    {
        name: "counter", //slice의 이름
        initialState, //slice에 들어갈 state(데이터들의) 초기값
        reducers: {
            //reducer은 객체 혹은 맵 -> state slice는 리듀서를 필요로 함(즉, store에 저장되어있는 state들을 변경해줄  reducer함수들을 여기에 추가
            //아래 메서드들은 나중에 redux에 의해서 호출됨(현재 상태를 받을 수 있음)
            //action은 필요없음(이유: 어떤 action을 했느냐에  따라 메서드가 자동으로 호출되기 때문)
            //나중에 각각의 리듀서에 해당하는 action을 발생시킬 것
            increment(state) {
                //이렇게하면 기존의 state에 접근해서 state를 변경하는 것 처럼 보이지만 redux-toolki와 createSlice함수를 사용하면 기존의 state를 바꿀 수 없다.
                //이유: redux toolkit 내부적으로 immer이라는 다른 패키지를 사용하는데 이 패키지가 자동으로 state를 복제해서 새로운 상태 객체를 생성함
                //아래에서 했던 것처럼 state.counter와 state.showCounter등을 전부 복제한 후 다시 객체를 생성하지 않아도 알아서 객체를 새로 생성해주므로 편리함!
                state.counter++;
            },
            decrement(state) {
                state.counter--;
            },
            increase(state, action) {
                //이 reducer은 추가적인 데이터를 필요로 함 -> 즉, payload가 필요함
                //redux-toolkit은 action을 듣고있는 reducer함수를 생성할 수 있음(즉, redux -toolkit의 함수도 action을 파라미터로 가질 수 있음)
                state.counter = state.counter + action.payload; //payload로 접근해야 원하는 값을 얻을 수 있음(추가 데이터를 가지고 있는 프로퍼티의 이름이므로)
            },
            toggleCounter(state) {
                state.showCounter = !state.showCounter;
            },
        },
    }
);
//위에처럼 slice를 작성하면 코드를 줄이고 편리하게 state를 사용할 수 있다.
//하지만 store는 이 slice를 어떻게 알 있을까?, 이 slice에 action 객체를 보낼 수 있을까?

//counterSlice.reducer이라고하면 slice에서 설정한 reducer에 접근 할 수 있음
//.reducer이지만 ir문이 들어있는 reducer을 하나로 묶은 큰 리듀서라고 할 수 있음
//하지만 createStore에는 하나의 reducer만 전달이 가능한데 slice가 여러개이면 reducer도 여러개이므로 -> configureStore을 이용함
//configureStore -> 여러개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있음
const store = configureStore({
    //configureStore에는 객체를 전달해야 함(reducer함수가 아니라 객체!!!!)
    //redux에는 전역 state를 담당하는 주요 reducer함수가 하나만 이었야 하므로 reducers가 아니라 reducer이다.
    //configureStore에서는 reducer의 값이 단일 reducer이 될 수 있음 ex. counterSlice.reducer를 사용해서 모든 리듀서 메서드를 갖추고 있는 counterSlice의 reducer함수를 사용이 가능함
    //slice가 여러개라면 reducer의 값으로 객체를 설정해서 거기에 slice의 리듀서를 넣을 수 있디 -> 결국 리듀서 맵을 형성하는 것 , 이 리듀서 맵은 주요 reducer의 값이 됨
    //그리고 configureStore은 모든 리듀서를 하나의 큰 reducer로 병합할 것
    //현재 프로젝트에서 사용하는 slice가 하나이므로  reducer: counterSlice.reducer이렇게 해도 문제 없음
    reducer: { counter: counterSlice.reducer },
});

//action객체에서 이런식으로 key에 접근할 수 있음 -> 즉, 직접적으로 리듀서 메서드에 접근할 필요가 없음 대신 redux toolkit에 의해 자동으로생성된 메서드가 생기고 그 메서드가 호출되면 자동으로 액션 객체 생성
export const counterActions = counterSlice.actions; //액션생성자 -> 이미 type프로퍼티를 가지고 있음

export default store;
