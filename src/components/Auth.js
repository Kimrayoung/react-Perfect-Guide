import { useDispatch } from "react-redux";
import classes from "./Auth.module.css";
import { authSliceActions } from "../store";

const Auth = () => {
    const dispatch = useDispatch();
    const loginHandler = (event) => {
        event.preventDefault();
        //여기서 로그인을 했다면 로그인에 대한 정보를 보내야 한다 -> 즉, state를 변경해줘야 한다 -> reducer가 state를 처리할 수 있도록 action 객체를 보내야 한다.
        dispatch(authSliceActions.login()); //action 생성자(액션 생성자는 실제 action object를 리턴함)
    };
    return (
        <main className={classes.auth}>
            <section>
                <form onSubmit={loginHandler}>
                    <div className={classes.control}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <button>Login</button>
                </form>
            </section>
        </main>
    );
};

export default Auth;
