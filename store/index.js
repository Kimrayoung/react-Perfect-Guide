//store에 관련된 src는 전부 store에 저장이 될 것
//redux-toolkit을 사용하지 않을 경우 문제점
// 애플리케이션의 규모가 커질 경우 : 리덕스에서 관리해야 할 상태가 더 많아질 경우
// 1. action type에서 문제가 생길 것 (즉, 식별자에 문자기 셍김 ex. action.type ==="increment")  -> action을 발생시킬 때 오타가 나면 안되는데 오타가 날 수 있음
    //해결방법 -> 식별자를 한 번 정의해놓고 정의한 이름을 사용하는 것
//2. 데이터의 양이 많아지면 문제가 생김(즉, 관리해야 할 데이터가 많아지면 state객체도 커질 것(ex. counter, showCounter) -> 하나의 action을 발생시킬 때도 더 많은 state를 복사해야 함 -> 데이터가 많아질 수록 반환해야 하는 state가 많아짐
//3. state 변경의 불가성 -> 중첩된 배열과 데이터가 많으면 실수로 데이터를 바꾸면서 state가 꼬일 확룰이 높아진다
import { createStore } from "redux";

//toggle counter가 눌리면 데이터가 보여야 하는지 아닌지 판단 가능 -> showCounter
//아래와 같은 방법으로 데이터를 여러개 관리 할 수 있음 
const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
    //reducer은 항상 기존의 state는 새로운 스냅샷을 반환해야 한다. -> 오타가 나면 reducer가 식별자를 인식하지 못한다. 
    //기존의 state와 병합되는 것이 아니라 기존의 state를 덮어쓰는 것
    //중요한 것 -> 절대 기존의 state를 변형해서는 안된다 대신에 새로운 state객체를 반환하여 항상 재정의해서 사용해야 한다.
    if (action.type === "increment") {
        return {
            counter: state.counter + 1,
            showCounter: state.showCounter
        };
    }
    // if (action.type === "incrementBy5") {
    //하지만 이렇게 확장식으로 더하는 값이 필요할 때마다 하나씩 더해서 올려주는 것은 하드 코딩으로 확장성이 부족함
    //그렇기 떄문에 카운터를 고정된 수만큼 증가시키는 것이 아니라 action객체로부터 증가시키고자 하는 값을 얻어서 증가시킴
    // return {
    //     counter: state.counter + 5,
    // };
    // }
    if (action.type === "increase") {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter,
        };
    }
    if (action.type === "decrement") {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter,
        };
    }

    if( action.type === 'toggle') {
        return {
            showCounter: !state.showCounter,
            counter: state.counter;
        }
    }
    return state;
};

//createStore에는 reducer함수를 가르킬 포인터를 넣어줘야 함
const store = createStore(counterReducer);

//우리가 필요한 것은 리액트 앱과 Redux store을 연결하는 것 ->  앱의 컴폰너트가 dispatch하고 들을 수 있음(즉, 구독이 가능해짐)
//위에 처럼 이 store을 리액트 앱과 연결하기 위해서는 store을 내보내야 함
export default store;
