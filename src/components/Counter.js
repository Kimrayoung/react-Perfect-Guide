//useSelector이란? react-redux의 훅을 의미함(custom hook)
//자동으로 상태의 일부를 선택하게 해줌(store가 관리하는 상태)
import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";

const Counter = () => {
    const dispatch = useDispatch(); //dispatch hook을 의미 -> useDispatch를 호출하면 실행할 수 있는 dispatch function을 반환
    //dispatch함수는 우리가 호출할 수 있는 함수로 redux store에 대한 action을 보냄
    const counter = useSelector((state) => state.counter); //useSeletor을 통해서 store에 접근할 수 있음
    //state => state.counter 이 함수는 react-redux가 실행함
    //그리고 state를 인자로 주었으므로 리덕스 상태를 보냄, 또한 이 함수로 데이터를 관리함
    //state.counter이라고 되어있으므로 state의 일부를 되찾음 -> state라는 인자를 가지고 들어가서 state 중에 key값이 counter인 데이터를 가지고 나옴
    //state => state.counter 함수는 어떤 데이터를 store에서 추출할지 결정함 -> 전체 객체에서 아주 일부만 받을 수 있음
    //즉, state => state.counter함수를 통해서 데이터를 관리하고 store에서 state의 일부를 전달 받음. 그럼 전달받은 일부를 useSelector이 return함
    //useSelector은 리액트 리덕스가 자동으로 서브스크립션을 설정함  -> 컴포넌트가 자동으로 업데이트 됨
    const show = useSelector((state) => state.showCounter);
    //showCounter이라는 데이터가 변경될 때마다 컴포넌트가 재평가될 것 -> 그리고 필요에 의해서 리렌더링 될 것

    const incrementHandler = () => {
        //incremen버튼과 연결되어있는 함수
        //dispatch함수는 위에서 말했듯이 useDispatch의 return값으로 나온 함수로 redux store에 대한 action을 보낼 수 있다
        //그러므로 여기에서 action을 보내기 위해서 실행을 함
        //action은 type이라는 속성을 가진 객체이다
        //type의 값은 store reducer에서 사용하는 identifiers중 하나여야 함(ex. increment, decrement)
        //아래의 dispatch를 이용해서 action객체를 보내면 reducer가 이 액션객체를 받아서 state를 처리함
        dispatch({ type: "increment" });
    };

    const increseHandler = () => {
        //여기서 보내려고 하는 것은 action은 단순히 type이 아니라 추가적인 데이터를 보내야 함
        //payload를 추가하고 여기에 데이터를 추가적으로 보냄
        //이렇게 보내면 reducer가 action의 payload를 추출해서 사용함
        dispatch({ type: "increase", amount: 5 });
    };

    const decrementHandler = () => {
        dispatch({ type: "decrement" });
    };

    const toggleCounterHandler = () => {
        dispatch({ type: "toggle" });
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {/* counter value자리에 store에 저장되어있는 counter 값을 가지고 와야함 */}
            {show && <div className={classes.value}> {counter} </div>}
            <div>
                {/* 버튼을 누르면 +1 혹은 -1이 되어야 함 -> 즉, 여기서 이벤트가 발생하면 app이 이벤트를 받아서 action을 발생시키고 
              이 action을 reducer함수가 받아서 store의 state를 변경해줘야함 */}
                <button onClick={incrementHandler}>increment</button>
                <button onClick={increseHandler}>increment by 5</button>
                <button onClick={decrementHandler}>decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
