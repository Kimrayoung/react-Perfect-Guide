import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/index";
import classes from "./Counter.module.css";

const Counter = () => {
    const dispatch = useDispatch();
    //여기에서 store에 저장된 state를 읽어올 수 있음(즉 저장소에 저장된 데이터를 가지고 옴)
    const counter = useSelector((state) => state.counter.counter); //앞의 counter은 react-redux에게 counter이라는 slice에 접근한 다는 것을 의미
    //앞의 counter slice는 configureStore reducer가 새로만든 state -> 그 상태 slice에서 가지고 있는 프로퍼티 이름이 counter인것
    const show = useSelector((state) => state.counter.showCounter);

    const incrementHandler = () => {
        dispatch(counterActions.increment()); //여기서 전체 액션 객체가 자동으로 생성됨
    };

    const increseHandler = () => {
        dispatch(counterActions.increase(10));
    };

    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    };

    const toggleCounterHandler = () => {
        dispatch(counterActions.toggleCounter());
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {show && <div className={classes.value}> {counter} </div>}
            <div>
                <button onClick={incrementHandler}>increment</button>
                <button onClick={increseHandler}>increment by 5</button>
                <button onClick={decrementHandler}>decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
