import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/index";
import classes from "./Counter.module.css";

const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter);
    const show = useSelector((state) => state.showCounter);

    const incrementHandler = () => {
        dispatch(counterActions.increment()); //여기서 전체 액션 객체가 자동으로 생성됨
    };

    const increseHandler = () => {
        dispatch(counterActions.increase(10)); //payload데이터를 전달해주기 위해서는 그냥 메서드에 값을 넣어서 전달해주면 됨
        //그럼 redux toolkit는 자동으로 액션 생성자를 생성해서 redux toolkit이 새성한 type: SOME_UNIQUE_IDENTIFIER을 전달하고 인자로서 실행하고자 하는 액션 메소드에 전달한 값을 추가한다
        //그리고 추가할 때는 필드명이 payload인 곳에 저장함(필드명을 개발자가 정하는 것 아님 -> 자동으로 저장이 되어있음)
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
